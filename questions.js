const DOMAINS = [
  {
    id: 'domain1',
    shortName: '第1分野',
    name: '複雑な組織に対応するソリューションの設計',
    weight: 26
  },
  {
    id: 'domain2',
    shortName: '第2分野',
    name: '新しいソリューションのための設計',
    weight: 29
  },
  {
    id: 'domain3',
    shortName: '第3分野',
    name: '既存ソリューションの継続的な改善',
    weight: 25
  },
  {
    id: 'domain4',
    shortName: '第4分野',
    name: '移行とモダナイゼーションの加速',
    weight: 20
  }
];

const QUESTION_BANK = [
  {
    id: 'd1-001',
    domain: 'domain1',
    tags: ['Organizations', 'CloudTrail', 'SCP'],
    type: 'multiple',
    select: 2,
    question: 'ある金融グループはAWS Organizations配下に250以上のAWSアカウントを持っています。監査チームは、全アカウントのCloudTrailログを専用監査アカウントのS3バケットへ集約し、各アカウント管理者が証跡を停止または削除できないようにしたいと考えています。新規アカウントにも自動的に適用され、運用負荷を最小化する必要があります。最も適切な対応を2つ選んでください。',
    choices: [
      { id: 'A', text: '各メンバーアカウントにCloudFormation StackSetsで個別のCloudTrailを作成し、各アカウントの管理者に運用を委任する。' },
      { id: 'B', text: 'Organizationsの組織証跡を作成し、ログ保存先を監査アカウントのS3バケットに設定する。' },
      { id: 'C', text: 'CloudTrailの停止・削除に関するAPIを拒否するSCPを対象OUへ適用する。' },
      { id: 'D', text: 'AWS ConfigマネージドルールでCloudTrail停止を検知し、手動で再有効化する運用手順を作成する。' },
      { id: 'E', text: '各アカウントのCloudWatch LogsへCloudTrailログを送信し、サブスクリプションフィルターで監査アカウントへ転送する。' }
    ],
    answer: ['B', 'C'],
    explanation: '組織全体への自動適用と運用負荷の低減にはOrganizationsの組織証跡が適しています。さらにSCPで停止・削除操作を拒否することで、メンバーアカウント管理者による改変を防げます。Configは検知・修復寄りで、予防統制としてはSCPより弱くなります。'
  },
  {
    id: 'd1-002',
    domain: 'domain1',
    tags: ['Control Tower', 'Account Factory', 'IAM Identity Center'],
    type: 'single',
    select: 1,
    question: '急成長中のSaaS企業は、事業部ごとにAWSアカウントを払い出しています。現在は手作業でアカウントを作成し、IAMユーザーを個別に作成しているため、監査証跡、ガードレール、初期ネットワーク設定にばらつきがあります。今後は新規アカウント払い出しを標準化し、ID管理を中央集約し、各事業部には必要な権限だけを付与したいと考えています。最小の運用負荷で要件を満たす構成はどれですか。',
    choices: [
      { id: 'A', text: 'AWS Control Towerを導入し、Account Factoryでアカウントを払い出し、IAM Identity Centerで権限セットを割り当てる。' },
      { id: 'B', text: '各事業部アカウントでIAMユーザーを作成し、共通のAdministratorAccessポリシーを付与する。' },
      { id: 'C', text: '単一AWSアカウント内に事業部ごとのVPCを作成し、IAMグループで権限を分離する。' },
      { id: 'D', text: 'Organizationsだけを有効化し、各アカウント管理者に初期設定手順書を配布する。' }
    ],
    answer: ['A'],
    explanation: 'Control Towerはマルチアカウント環境の標準化、ガードレール、アカウント払い出しに向きます。IAM Identity Centerは人のログイン権限を中央管理するサービスです。手順書運用や個別IAMユーザーは統制と運用負荷の面で不利です。'
  },
  {
    id: 'd1-003',
    domain: 'domain1',
    tags: ['Transit Gateway', 'Direct Connect', 'Network'],
    type: 'single',
    select: 1,
    question: 'グローバル製造業は、複数リージョンと複数アカウントに分散したVPCをオンプレミスデータセンターへ接続しています。現在はVPCごとにVPN接続を作成しており、ルーティング管理が複雑化しています。今後もアカウントとVPCは増え続けます。中央ネットワークチームが接続を統制し、運用負荷を下げ、オンプレミスとの安定した帯域も確保したい場合、最も適切な設計はどれですか。',
    choices: [
      { id: 'A', text: '各VPCに個別のSite-to-Site VPNを追加し、各アプリチームにルートテーブル管理を委任する。' },
      { id: 'B', text: 'Transit Gatewayを中心にVPCを接続し、オンプレミスとはDirect Connect Gatewayを介して接続する。' },
      { id: 'C', text: '全VPCをVPCピアリングでフルメッシュ接続し、オンプレミスとは1つの踏み台VPC経由で接続する。' },
      { id: 'D', text: '各VPCにNAT Gatewayを配置し、オンプレミスからはパブリックIP経由でアクセスする。' }
    ],
    answer: ['B'],
    explanation: 'VPC数が増える環境ではTransit Gatewayでハブアンドスポーク型に集約するとルーティング管理を単純化できます。オンプレミスとの安定接続にはDirect Connect Gatewayとの組み合わせが有効です。VPCピアリングのフルメッシュは拡張性と運用性に難があります。'
  },
  {
    id: 'd2-001',
    domain: 'domain2',
    tags: ['API Gateway', 'SQS', 'Lambda'],
    type: 'single',
    select: 1,
    question: 'スマートシティプロジェクトでは、都市全域の数百万台のIoTセンサーがHTTPS経由でREST APIへ気象・交通データを送信します。イベント発生時には一時的に送信量が急増します。すべてのデータを欠損なく受け付け、後段処理のスパイクを吸収し、運用負荷を最小化したいと考えています。最も適切な構成はどれですか。',
    choices: [
      { id: 'A', text: 'Network Load Balancerの背後にEC2 Auto Scalingグループを配置し、各インスタンスが同期的にデータを処理する。' },
      { id: 'B', text: 'API Gateway HTTP APIでエンドポイントを公開し、SQSへのサービス統合でメッセージを蓄積し、Lambdaがイベントソースマッピングで処理する。' },
      { id: 'C', text: 'CloudFrontとLambda@Edgeで受信データを処理し、処理結果をDynamoDB Streamsへ書き込む。' },
      { id: 'D', text: 'API Gateway REST APIからLambdaを同期実行し、Lambdaの同時実行数上限だけを引き上げる。' }
    ],
    answer: ['B'],
    explanation: '突発的な流量増加を欠損なく受けるには、受付と処理をSQSで疎結合にする設計が有効です。API GatewayからSQSへ入れ、Lambdaが非同期に処理することでスパイクを吸収できます。同期Lambdaだけでは後段処理のスロットリングや失敗時の再処理設計が弱くなります。'
  },
  {
    id: 'd2-002',
    domain: 'domain2',
    tags: ['Aurora', 'DR', 'Multi-Region'],
    type: 'single',
    select: 1,
    question: 'ECサイトはAurora PostgreSQLを使用しています。平常時は単一リージョンで稼働していますが、リージョン障害時には別リージョンへ数分以内に読み書きを切り替えたい要件があります。データ損失は最小化し、アプリケーション変更もできるだけ少なくしたいです。最も適切な選択肢はどれですか。',
    choices: [
      { id: 'A', text: 'Aurora Global Databaseを構成し、セカンダリリージョンを用意して障害時に昇格する。' },
      { id: 'B', text: '毎日取得する手動スナップショットを別リージョンへコピーし、障害時に復元する。' },
      { id: 'C', text: 'RDSイベント通知を使って障害時に新しいDBインスタンスを別AZへ作成する。' },
      { id: 'D', text: 'DynamoDB Global Tablesへ移行し、既存SQLアプリケーションをそのまま接続する。' }
    ],
    answer: ['A'],
    explanation: 'Aurora Global Databaseは低遅延のクロスリージョンレプリケーションと災害対策に適しています。スナップショット復元はRTOが長くなりがちです。DynamoDBへの移行はアプリケーション変更が大きく、SQL互換もありません。'
  },
  {
    id: 'd2-003',
    domain: 'domain2',
    tags: ['CloudFront', 'S3', 'OAC'],
    type: 'multiple',
    select: 2,
    question: 'メディア企業は画像と動画をS3に保存し、世界中のユーザーへ配信します。S3バケットはインターネットから直接アクセスできないようにし、CloudFront経由のアクセスだけを許可したいです。さらに、古いOAIではなく現在推奨される方式を採用したいと考えています。必要な対応を2つ選んでください。',
    choices: [
      { id: 'A', text: 'CloudFrontのOrigin Access Controlを作成し、S3オリジンに関連付ける。' },
      { id: 'B', text: 'S3バケットをパブリック読み取り可能にし、CloudFront側で署名付きURLを必須にする。' },
      { id: 'C', text: 'S3バケットポリシーでCloudFrontディストリビューションからのアクセスだけを許可する。' },
      { id: 'D', text: '各オブジェクトにパブリックACLを付与し、CloudFrontのキャッシュTTLを長くする。' },
      { id: 'E', text: 'CloudFront FunctionsでS3のIAM認証情報を生成し、オリジンリクエストへ付与する。' }
    ],
    answer: ['A', 'C'],
    explanation: 'S3を非公開にしてCloudFront経由に限定するにはOrigin Access Controlとバケットポリシーを組み合わせます。S3をパブリックにする案は要件に反します。CloudFront FunctionsでIAM認証情報を扱う設計も不適切です。'
  },
  {
    id: 'd3-001',
    domain: 'domain3',
    tags: ['Cost', 'NAT Gateway', 'VPC Endpoint'],
    type: 'multiple',
    select: 2,
    question: '複数のプライベートサブネットに配置されたアプリケーションが、S3とDynamoDBへ大量にアクセスしています。現在は各AZのNAT Gateway経由でアクセスしており、データ処理料金が大きくなっています。インターネット経由を避けつつ、可用性を維持し、コストを削減したいです。適切な対応を2つ選んでください。',
    choices: [
      { id: 'A', text: 'S3用Gateway VPC Endpointを作成し、対象サブネットのルートテーブルに関連付ける。' },
      { id: 'B', text: 'DynamoDB用Gateway VPC Endpointを作成し、対象サブネットのルートテーブルに関連付ける。' },
      { id: 'C', text: 'NAT Gatewayを1つのAZだけに集約し、すべてのプライベートサブネットから利用する。' },
      { id: 'D', text: 'S3とDynamoDBへアクセスするためにInternet Gatewayへのデフォルトルートを追加する。' },
      { id: 'E', text: 'すべてのアプリケーションをパブリックサブネットへ移動し、パブリックIPを付与する。' }
    ],
    answer: ['A', 'B'],
    explanation: 'S3とDynamoDBにはGateway VPC Endpointを使えます。NAT Gatewayを経由しないため、プライベート接続を維持しながらコスト削減できます。NAT Gatewayを単一AZに集約するとAZ障害時の可用性が落ちます。'
  },
  {
    id: 'd3-002',
    domain: 'domain3',
    tags: ['Auto Scaling', 'ALB', 'Resilience'],
    type: 'single',
    select: 1,
    question: '既存のWebアプリケーションは単一AZのEC2インスタンス1台で稼働しています。夜間バッチ後やキャンペーン時にCPU使用率が急上昇し、障害時の復旧も手作業です。アプリケーション自体はステートレス化済みで、セッション情報は外部ストアにあります。可用性とスケーラビリティを改善する最小変更の構成はどれですか。',
    choices: [
      { id: 'A', text: 'Application Load Balancerと複数AZにまたがるAuto Scalingグループを構成し、CPUやリクエスト数に基づいてスケールする。' },
      { id: 'B', text: '既存EC2インスタンスのインスタンスタイプを最大サイズに変更し、障害時はAMIから手動復元する。' },
      { id: 'C', text: '単一AZ内にEC2インスタンスを複数台作成し、Route 53の加重ルーティングで分散する。' },
      { id: 'D', text: 'アプリケーションをすぐにEKSへ移行し、すべてのデプロイ方式を再設計する。' }
    ],
    answer: ['A'],
    explanation: 'ステートレス化済みなら、ALBと複数AZのAuto Scalingグループで最小変更のまま可用性とスケール性を改善できます。単一AZのままではAZ障害に弱く、EKS全面移行は要件に対して変更が大きすぎます。'
  },
  {
    id: 'd3-003',
    domain: 'domain3',
    tags: ['Observability', 'CloudWatch', 'X-Ray'],
    type: 'single',
    select: 1,
    question: 'マイクロサービス化された注文処理システムで、ユーザーから「たまに注文完了が遅い」と報告されています。各サービスはECSとLambdaで構成され、CloudWatch Logsにはログがありますが、どのサービス間で遅延が発生しているか追跡できません。分散トレースでボトルネックを把握し、既存ログとも関連付けたい場合、最も適切な対応はどれですか。',
    choices: [
      { id: 'A', text: 'AWS X-Rayを有効化し、ECSタスクとLambdaからトレースを送信してサービスマップとセグメントを確認する。' },
      { id: 'B', text: 'すべてのCloudWatch LogsをS3へエクスポートし、Athenaで月次集計する。' },
      { id: 'C', text: 'ALBアクセスログだけを有効化し、ターゲットグループごとの平均応答時間のみ確認する。' },
      { id: 'D', text: 'CloudTrail Lakeを有効化し、アプリケーションの処理遅延をAPI監査イベントから追跡する。' }
    ],
    answer: ['A'],
    explanation: '分散トレースにはAWS X-Rayが適しています。サービス間の呼び出し、遅延、エラーを追跡できます。CloudTrailは管理API監査向けで、アプリケーション内部の遅延分析には向きません。'
  },
  {
    id: 'd4-001',
    domain: 'domain4',
    tags: ['MGN', 'Migration'],
    type: 'single',
    select: 1,
    question: '企業はオンプレミスの仮想マシン200台を短期間でAWSへ移行したいと考えています。アプリケーション改修の時間はなく、まずは現行サーバーをほぼそのままEC2へ移したいです。移行中も継続的にデータをレプリケーションし、カットオーバー時の停止時間を最小化したい場合、最も適切なサービスはどれですか。',
    choices: [
      { id: 'A', text: 'AWS Application Migration Serviceを使用してブロックレベルで継続レプリケーションし、EC2へカットオーバーする。' },
      { id: 'B', text: 'AWS Database Migration Serviceを使用して仮想マシン全体をEC2へ変換する。' },
      { id: 'C', text: 'AWS DataSyncを使用してOSディスクをS3へ同期し、S3からEC2を直接起動する。' },
      { id: 'D', text: 'AWS Transfer Familyを使用してアプリケーションサーバーをSFTPで移行する。' }
    ],
    answer: ['A'],
    explanation: 'リホスト、つまり現行サーバーを大きく変えずにEC2へ移す移行にはAWS Application Migration Serviceが適しています。DMSはデータベース移行、DataSyncはファイル転送向けです。'
  },
  {
    id: 'd4-002',
    domain: 'domain4',
    tags: ['DMS', 'SCT', 'Database'],
    type: 'multiple',
    select: 2,
    question: 'オンプレミスのOracleデータベースをAmazon Aurora PostgreSQLへ移行します。スキーマ互換性の確認と変換が必要で、移行期間中は既存システムを稼働させたまま変更データを継続的に反映したいです。適切なサービスの組み合わせを2つ選んでください。',
    choices: [
      { id: 'A', text: 'AWS Schema Conversion Toolでスキーマとコードの変換評価を行う。' },
      { id: 'B', text: 'AWS Database Migration ServiceでフルロードとCDCを実行する。' },
      { id: 'C', text: 'AWS Application Migration ServiceでOracleスキーマをPostgreSQL互換に変換する。' },
      { id: 'D', text: 'AWS BackupでOracleバックアップを取得し、Aurora PostgreSQLへ直接リストアする。' },
      { id: 'E', text: 'AWS Transfer FamilyでREDOログをSFTP転送し、Auroraへ自動適用する。' }
    ],
    answer: ['A', 'B'],
    explanation: '異種DB移行ではSCTでスキーマ変換を評価し、DMSでデータ移行とCDCを行うのが典型です。CDCはChange Data Captureの略で、移行元の変更データを継続取得する方式です。'
  },
  {
    id: 'd4-003',
    domain: 'domain4',
    tags: ['DataSync', 'EFS', 'File Migration'],
    type: 'single',
    select: 1,
    question: '研究機関はオンプレミスNASに保存された数百TBの共有ファイルをAmazon EFSへ移行したいです。移行期間中もオンプレミス側ではファイル更新が続きます。ネットワーク経由で差分を効率的に同期し、カットオーバー前に最終同期を行いたい場合、最も適切なサービスはどれですか。',
    choices: [
      { id: 'A', text: 'AWS DataSyncを使用してオンプレミスNFS/SMB共有からAmazon EFSへ同期する。' },
      { id: 'B', text: 'AWS DMSを使用してファイルシステムのメタデータと本文をEFSへ移行する。' },
      { id: 'C', text: 'Amazon SQSにファイルパスを投入し、LambdaでオンプレミスNASを直接マウントしてコピーする。' },
      { id: 'D', text: 'CloudTrailでファイル更新イベントを検知し、EFSへレプリケーションする。' }
    ],
    answer: ['A'],
    explanation: 'オンプレミスファイル共有からAWSストレージサービスへの効率的なデータ転送にはDataSyncが適しています。差分同期や検証に対応します。DMSはデータベース移行向けです。'
  }
];
