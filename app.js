const STORAGE_KEY = 'sapC02StudyTrainer.v1';
const CHOICE_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const state = {
  records: {},
  session: null,
  timer: null,
  remainingSeconds: 0
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.records) state.records = saved.records;
  } catch {
    state.records = {};
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ records: state.records }));
}

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function domainById(id) {
  return DOMAINS.find((domain) => domain.id === id);
}

function recordFor(questionId) {
  return state.records[questionId] || {
    attempts: 0,
    correct: 0,
    incorrect: 0,
    checked: false,
    mastered: false,
    lastAnswer: [],
    lastResult: null
  };
}

function setView(viewId) {
  $$('.view').forEach((view) => view.classList.remove('active-view'));
  $(viewId).classList.add('active-view');
}

function selectedRadio(name) {
  return $(`input[name="${name}"]:checked`)?.value;
}

function selectedDomains() {
  const checked = $$('input[name="domainFilter"]:checked').map((input) => input.value);
  return checked.length ? checked : DOMAINS.map((domain) => domain.id);
}

function getQuestionById(id) {
  return QUESTION_BANK.find((question) => question.id === id);
}

function isCorrect(question, selected) {
  const expected = [...question.answer].sort().join(',');
  const actual = [...selected].sort().join(',');
  return expected === actual;
}

function displayLabelFor(item, choiceId) {
  const index = item.choices.indexOf(choiceId);
  return CHOICE_LABELS[index] || choiceId;
}

function filterQuestions({ domains, status, hideAnswered }) {
  return QUESTION_BANK.filter((question) => {
    const record = recordFor(question.id);
    if (!domains.includes(question.domain)) return false;
    if (hideAnswered && record.correct > 0) return false;
    if (status === 'unanswered' && record.attempts > 0) return false;
    if (status === 'incorrect' && record.incorrect === 0) return false;
    if (status === 'checked' && !record.checked) return false;
    if (status === 'notMastered' && record.mastered) return false;
    return true;
  });
}

function buildSession(questions, mode) {
  const shuffleChoices = $('#shuffleChoices').checked;
  return {
    mode,
    index: 0,
    startedAt: Date.now(),
    completed: false,
    items: questions.map((question) => ({
      questionId: question.id,
      choices: shuffleChoices ? shuffle(question.choices).map((choice) => choice.id) : question.choices.map((choice) => choice.id),
      selected: [],
      answered: false,
      correct: null
    }))
  };
}

function startPractice(overrides = {}) {
  const domains = overrides.domains || selectedDomains();
  const status = overrides.status || selectedRadio('statusFilter');
  const hideAnswered = overrides.hideAnswered ?? $('#hideAnswered').checked;
  const countValue = overrides.count || selectedRadio('questionCount');
  const pool = shuffle(filterQuestions({ domains, status, hideAnswered }));
  const count = countValue === 'all' ? pool.length : Number(countValue);
  const questions = pool.slice(0, count);

  if (!questions.length) {
    alert('条件に合う問題がありません。条件を変更してください。');
    return;
  }

  clearTimer();
  state.session = buildSession(questions, overrides.mode || 'practice');
  setView('#quizView');
  renderQuiz();
}

function startExam() {
  const byDomain = Object.fromEntries(DOMAINS.map((domain) => [domain.id, shuffle(QUESTION_BANK.filter((question) => question.domain === domain.id))]));
  const target = { domain1: 19, domain2: 22, domain3: 19, domain4: 15 };
  let questions = [];
  DOMAINS.forEach((domain) => {
    questions = questions.concat(byDomain[domain.id].slice(0, target[domain.id]));
  });
  questions = shuffle([...new Map(questions.map((question) => [question.id, question])).values()]);
  if (questions.length < 75) questions = shuffle(QUESTION_BANK);

  state.session = buildSession(questions.slice(0, 75), 'exam');
  state.remainingSeconds = 180 * 60;
  startTimer();
  setView('#quizView');
  renderQuiz();
}

function currentItem() {
  return state.session.items[state.session.index];
}

function currentQuestion() {
  return getQuestionById(currentItem().questionId);
}

function renderHome() {
  $('#totalQuestionCount').textContent = `${QUESTION_BANK.length}問`;
  $('#domainFilters').innerHTML = DOMAINS.map((domain) => `
    <label><input type="checkbox" name="domainFilter" value="${domain.id}" checked> ${domain.shortName}: ${domain.name}</label>
  `).join('');

  $('#domainSummary').innerHTML = DOMAINS.map((domain) => {
    const questions = QUESTION_BANK.filter((question) => question.domain === domain.id);
    const answered = questions.filter((question) => recordFor(question.id).attempts > 0).length;
    const correct = questions.filter((question) => recordFor(question.id).correct > 0).length;
    const incorrect = questions.filter((question) => recordFor(question.id).incorrect > 0).length;
    const rate = answered ? Math.round((correct / answered) * 100) : 0;
    return `
      <article class="summary-card">
        <p class="eyebrow">${domain.shortName}</p>
        <h3>${domain.name}</h3>
        <div class="metric-row"><span>問題数</span><strong>${questions.length}</strong></div>
        <div class="metric-row"><span>回答済み</span><strong>${answered}</strong></div>
        <div class="metric-row"><span>正答率</span><strong>${rate}%</strong></div>
        <div class="metric-row"><span>不正解あり</span><strong>${incorrect}</strong></div>
      </article>
    `;
  }).join('');
}

function renderQuiz() {
  const session = state.session;
  const item = currentItem();
  const question = currentQuestion();
  const domain = domainById(question.domain);
  const record = recordFor(question.id);
  const progress = session.index + 1;
  const progressRate = Math.round((progress / session.items.length) * 100);

  $('#sessionModeLabel').textContent = session.mode === 'exam' ? '模擬試験' : '演習';
  $('#progressText').textContent = `${progress} / ${session.items.length}`;
  $('#progressBar').style.width = `${progressRate}%`;
  $('#domainBadge').textContent = `${domain.shortName}: ${domain.name}`;
  $('#tagBadges').innerHTML = question.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');
  $('#questionTitle').textContent = question.question;
  $('#selectHint').textContent = question.select === 1 ? '1つ選択してください。' : `${question.select}つ選択してください。`;
  $('#checkButton').textContent = record.checked ? 'チェック済み' : 'チェック';
  $('#checkButton').classList.toggle('danger', record.checked);

  $('#choiceList').innerHTML = item.choices.map((choiceId, index) => {
    const choice = question.choices.find((entry) => entry.id === choiceId);
    const displayLabel = CHOICE_LABELS[index] || choice.id;
    const inputType = question.select === 1 ? 'radio' : 'checkbox';
    const selected = item.selected.includes(choice.id) ? 'checked' : '';
    const correctClass = item.answered && question.answer.includes(choice.id) ? ' correct-choice' : '';
    const wrongClass = item.answered && item.selected.includes(choice.id) && !question.answer.includes(choice.id) ? ' wrong-choice' : '';
    return `
      <label class="choice${correctClass}${wrongClass}">
        <input type="${inputType}" name="answerChoice" value="${choice.id}" ${selected} ${item.answered ? 'disabled' : ''}>
        <span><strong>${displayLabel}.</strong> ${choice.text}</span>
      </label>
    `;
  }).join('');

  $('#resultBox').className = 'result-box hidden';
  $('#resultBox').innerHTML = '';
  if (item.answered) {
    $('#resultBox').className = `result-box ${item.correct ? 'correct' : 'incorrect'}`;
    $('#resultBox').innerHTML = `
      <strong>${item.correct ? '正解' : '不正解'}</strong><br>
      あなたの回答: ${item.selected.length ? item.selected.map((choiceId) => displayLabelFor(item, choiceId)).join(', ') : '未回答'}<br>
      正解: ${question.answer.map((choiceId) => displayLabelFor(item, choiceId)).join(', ')}<br><br>
      ${question.explanation}
    `;
  }

  $('#submitButton').disabled = item.answered;
  $('#prevButton').disabled = session.index === 0;
  $('#nextButton').disabled = session.index === session.items.length - 1;

  renderQuestionGrid();
}

function renderQuestionGrid() {
  $('#questionGrid').innerHTML = state.session.items.map((item, index) => {
    const classes = [
      index === state.session.index ? 'current' : '',
      item.answered ? 'answered' : '',
      item.answered && !item.correct ? 'wrong' : ''
    ].filter(Boolean).join(' ');
    return `<button type="button" class="${classes}" data-index="${index}">${index + 1}</button>`;
  }).join('');
  $$('#questionGrid button').forEach((button) => {
    button.addEventListener('click', () => {
      state.session.index = Number(button.dataset.index);
      renderQuiz();
    });
  });
}

function submitAnswer() {
  const item = currentItem();
  const question = currentQuestion();
  const selected = $$('input[name="answerChoice"]:checked').map((input) => input.value);
  if (!selected.length) {
    alert('回答を選択してください。');
    return;
  }
  if (selected.length !== question.select) {
    alert(`${question.select}つ選択してください。`);
    return;
  }

  item.selected = selected;
  item.answered = true;
  item.correct = isCorrect(question, selected);

  const record = recordFor(question.id);
  state.records[question.id] = {
    ...record,
    attempts: record.attempts + 1,
    correct: record.correct + (item.correct ? 1 : 0),
    incorrect: record.incorrect + (item.correct ? 0 : 1),
    mastered: item.correct ? record.correct + 1 >= 2 : false,
    lastAnswer: selected,
    lastResult: item.correct ? 'correct' : 'incorrect',
    lastAnsweredAt: new Date().toISOString()
  };
  saveState();
  renderQuiz();
}

function finishSession() {
  clearTimer();
  state.session.completed = true;
  renderResult();
  renderHome();
  setView('#resultView');
}

function renderResult() {
  const session = state.session;
  const answered = session.items.filter((item) => item.answered);
  const correct = answered.filter((item) => item.correct);
  const incorrect = answered.filter((item) => !item.correct);
  const unanswered = session.items.length - answered.length;
  const score = session.mode === 'exam' ? Math.round(100 + (correct.length / Math.max(1, session.items.length)) * 900) : null;

  $('#resultTitle').textContent = session.mode === 'exam'
    ? `スコア ${score} / 1000 ${score >= 750 ? '合格ライン到達' : '復習推奨'}`
    : `演習結果 ${correct.length} / ${session.items.length} 問正解`;

  $('#resultSummary').innerHTML = [
    ['出題数', session.items.length],
    ['正解', correct.length],
    ['不正解', incorrect.length],
    ['未回答', unanswered]
  ].map(([label, value]) => `<div class="result-stat">${label}<strong>${value}</strong></div>`).join('');

  $('#domainResult').innerHTML = DOMAINS.map((domain) => {
    const items = session.items.filter((item) => getQuestionById(item.questionId).domain === domain.id);
    const domainAnswered = items.filter((item) => item.answered);
    const domainCorrect = domainAnswered.filter((item) => item.correct);
    const rate = domainAnswered.length ? Math.round((domainCorrect.length / domainAnswered.length) * 100) : 0;
    return `
      <div class="bar-row">
        <strong>${domain.shortName}</strong>
        <div class="bar-track"><div class="bar-fill" style="width:${rate}%"></div></div>
        <span>${rate}%</span>
      </div>
    `;
  }).join('');

  $('#retryWrongButton').disabled = incorrect.length === 0;
}

function retrySessionWrong() {
  const wrongQuestions = state.session.items
    .filter((item) => item.answered && !item.correct)
    .map((item) => getQuestionById(item.questionId));
  if (!wrongQuestions.length) return;
  clearTimer();
  state.session = buildSession(wrongQuestions, 'practice');
  setView('#quizView');
  renderQuiz();
}

function toggleCheck() {
  const question = currentQuestion();
  const record = recordFor(question.id);
  state.records[question.id] = { ...record, checked: !record.checked };
  saveState();
  renderQuiz();
}

function startTimer() {
  clearTimer();
  renderTimer();
  state.timer = setInterval(() => {
    state.remainingSeconds -= 1;
    renderTimer();
    if (state.remainingSeconds <= 0) finishSession();
  }, 1000);
}

function clearTimer() {
  if (state.timer) clearInterval(state.timer);
  state.timer = null;
  $('#timerText').textContent = '';
  $('#timerText').classList.remove('warning');
}

function renderTimer() {
  const minutes = Math.floor(state.remainingSeconds / 60);
  const seconds = state.remainingSeconds % 60;
  $('#timerText').textContent = `残り時間 ${minutes}:${String(seconds).padStart(2, '0')}`;
  $('#timerText').classList.toggle('warning', state.remainingSeconds <= 300);
}

function exportHistory() {
  const blob = new Blob([JSON.stringify({ records: state.records }, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `sap-c02-study-history-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function resetHistory() {
  if (!confirm('学習履歴をリセットしますか？')) return;
  state.records = {};
  saveState();
  renderHome();
}

function bindEvents() {
  $('#startPracticeButton').addEventListener('click', () => startPractice());
  $('#startExamButton').addEventListener('click', startExam);
  $('#reviewIncorrectButton').addEventListener('click', () => startPractice({ status: 'incorrect', count: 'all', hideAnswered: false }));
  $('#reviewCheckedButton').addEventListener('click', () => startPractice({ status: 'checked', count: 'all', hideAnswered: false }));
  $('#reviewUnansweredButton').addEventListener('click', () => startPractice({ status: 'unanswered', count: 'all', hideAnswered: false }));
  $('#submitButton').addEventListener('click', submitAnswer);
  $('#nextButton').addEventListener('click', () => {
    state.session.index = Math.min(state.session.index + 1, state.session.items.length - 1);
    renderQuiz();
  });
  $('#prevButton').addEventListener('click', () => {
    state.session.index = Math.max(state.session.index - 1, 0);
    renderQuiz();
  });
  $('#finishButton').addEventListener('click', finishSession);
  $('#backHomeButton').addEventListener('click', () => {
    clearTimer();
    renderHome();
    setView('#homeView');
  });
  $('#checkButton').addEventListener('click', toggleCheck);
  $('#retryWrongButton').addEventListener('click', retrySessionWrong);
  $('#resultHomeButton').addEventListener('click', () => {
    renderHome();
    setView('#homeView');
  });
  $('#exportButton').addEventListener('click', exportHistory);
  $('#resetButton').addEventListener('click', resetHistory);
}

loadState();
bindEvents();
renderHome();
