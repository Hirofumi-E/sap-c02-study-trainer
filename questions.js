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
  },
  {
    id: 'd1-004',
    domain: 'domain1',
    tags: ['S3', 'Access Point', 'VPC Endpoint'],
    type: 'multiple',
    select: 2,
    question: 'ある企業は中央データアカウントのS3バケットに、複数アカウント・複数VPC上のマイクロサービスからアクセスしています。各サービスには必要なプレフィックスだけを許可し、S3への通信はパブリックインターネットを経由させたくありません。サービスごとの権限分離をしながら、ネットワーク経路も制御する必要があります。適切な対応を2つ選んでください。',
    choices: [
      { id: 'A', text: '中央データアカウントでマイクロサービスごとのS3 Access Pointを作成し、各アクセスポイントに最小権限のポリシーを設定する。' },
      { id: 'B', text: '各マイクロサービスが稼働するVPCにS3 Gateway VPC Endpointを作成し、ルートテーブルへ関連付ける。' },
      { id: 'C', text: 'すべてのサービスに同一のバケットポリシーでバケット全体への読み書きを許可し、アプリケーション側でアクセス先を制御する。' },
      { id: 'D', text: '中央データアカウントのVPCにS3 Gateway VPC Endpointを1つ作成し、Transit Gateway経由で全VPCから共有する。' },
      { id: 'E', text: 'S3バケットをパブリック公開し、CloudFrontの地理制限でアクセス元を制限する。' }
    ],
    answer: ['A', 'B'],
    explanation: 'サービスごとの最小権限にはS3 Access Pointが有効です。S3 Gateway VPC Endpointは各VPCに作成し、S3への通信をAWSネットワーク内に閉じられます。Gateway EndpointはTransit Gateway経由で別VPCから共有するものではありません。'
  },
  {
    id: 'd1-005',
    domain: 'domain1',
    tags: ['IAM', 'Permission Boundary', 'Delegation'],
    type: 'single',
    select: 1,
    question: 'プラットフォームチームは各開発チームにIAMロール作成を委任したい一方で、開発チームが管理者権限を持つロールや、監査対象外の権限を持つロールを作成することは防ぎたいと考えています。開発チームは自分たちのアプリケーションに必要な範囲でロールを作成できる必要があります。最小の運用負荷で権限の上限を強制する方法はどれですか。',
    choices: [
      { id: 'A', text: '開発チームにIAMロール作成権限を付与し、作成されるロールには必ずPermission Boundaryを設定させるポリシーを適用する。' },
      { id: 'B', text: '開発チーム全員にAdministratorAccessを付与し、月次監査で過剰権限を削除する。' },
      { id: 'C', text: 'IAMユーザーをチームごとに共有し、アクセスキーをSecrets Managerに保存して利用させる。' },
      { id: 'D', text: '各ロール作成依頼をチケット化し、中央チームがすべて手動で作成する。' }
    ],
    answer: ['A'],
    explanation: 'Permission Boundaryは、IAMエンティティに付与できる権限の上限を定義する仕組みです。委任管理をしつつ権限の上限を強制できます。月次監査は予防ではなく事後対応で、共有IAMユーザーは監査性とセキュリティの面で不適切です。'
  },
  {
    id: 'd1-006',
    domain: 'domain1',
    tags: ['Route 53 Resolver', 'Hybrid DNS'],
    type: 'multiple',
    select: 2,
    question: '企業はオンプレミスとAWSをDirect Connectで接続しています。オンプレミスの社内ドメインは既存DNSで管理され、AWS側のプライベートホスト名はRoute 53 Private Hosted Zoneで管理されています。オンプレミスからAWS内の名前解決を行い、AWSからオンプレミスの社内ドメインも名前解決したいです。ハイブリッドDNSを構成するために必要な対応を2つ選んでください。',
    choices: [
      { id: 'A', text: 'Route 53 Resolver inbound endpointを作成し、オンプレミスDNSからAWS側の名前解決問い合わせを転送する。' },
      { id: 'B', text: 'Route 53 Resolver outbound endpointとResolver ruleを作成し、社内ドメインの問い合わせをオンプレミスDNSへ転送する。' },
      { id: 'C', text: 'AWS側の全EC2にパブリックIPを付与し、オンプレミスDNSにパブリックDNS名を登録する。' },
      { id: 'D', text: 'Private Hosted ZoneをパブリックHosted Zoneへ変更し、インターネット経由で名前解決させる。' },
      { id: 'E', text: 'CloudFront FunctionsでDNS問い合わせを書き換え、オンプレミスDNSへ転送する。' }
    ],
    answer: ['A', 'B'],
    explanation: 'オンプレミスからAWS側へ問い合わせを受けるにはinbound endpoint、AWSからオンプレミス側へ転送するにはoutbound endpointとResolver ruleを使います。Private Hosted Zoneをパブリック化する必要はありません。'
  },
  {
    id: 'd1-007',
    domain: 'domain1',
    tags: ['Backup', 'Organizations', 'Cross-Account'],
    type: 'single',
    select: 1,
    question: '複数アカウントに分散したRDS、EFS、EBSのバックアップを標準化したいです。セキュリティチームは、アプリケーションアカウントの管理者がバックアップを削除できないよう、別の保管先アカウントへバックアップを集約したいと考えています。新規アカウントにも同じポリシーを適用し、運用負荷を抑えるにはどの構成が最も適切ですか。',
    choices: [
      { id: 'A', text: 'AWS BackupのOrganizations連携を有効化し、バックアップポリシーをOUへ適用し、クロスアカウントバックアップコピーを設定する。' },
      { id: 'B', text: '各アカウントで個別にcronを設定し、スナップショットを取得したあと手動で別アカウントへコピーする。' },
      { id: 'C', text: 'RDS、EFS、EBSごとに別々のLambda関数を作り、各サービスAPIを定期実行する。' },
      { id: 'D', text: '全アプリケーションを単一アカウントへ統合し、アカウント内でバックアップ権限だけを分離する。' }
    ],
    answer: ['A'],
    explanation: 'AWS Backupは複数サービスのバックアップを一元管理できます。Organizations連携とバックアップポリシーを使うことで、OU単位で標準化できます。クロスアカウントコピーにより、アプリケーションアカウントから分離した保管も可能です。'
  },
  {
    id: 'd2-004',
    domain: 'domain2',
    tags: ['EventBridge', 'Step Functions', 'Serverless'],
    type: 'single',
    select: 1,
    question: '保険会社は申込受付後に、本人確認、信用情報照会、契約条件判定、通知送信という複数ステップの処理を行います。一部の外部APIは失敗することがあり、再試行とタイムアウト制御が必要です。処理状態を追跡でき、コード内に複雑な状態管理を持たせず、サーバーレスで実装したい場合、最も適切な構成はどれですか。',
    choices: [
      { id: 'A', text: 'EventBridgeで申込イベントを受け取り、Step Functionsで各処理をLambdaや外部API呼び出しとしてオーケストレーションする。' },
      { id: 'B', text: '1つのLambda関数にすべての処理を直列実装し、失敗時は関数内のwhileループで無制限に再試行する。' },
      { id: 'C', text: 'EC2上のcronで1分ごとに申込テーブルをポーリングし、処理状態をローカルファイルに保存する。' },
      { id: 'D', text: 'CloudFront Functionsで申込処理を実行し、外部API呼び出しもエッジで完結させる。' }
    ],
    answer: ['A'],
    explanation: 'Step Functionsは複数ステップのワークフロー、再試行、分岐、タイムアウト、状態追跡に適しています。EventBridgeでイベント駆動にすると疎結合になります。1つのLambdaに状態管理を詰め込むと保守性が下がります。'
  },
  {
    id: 'd2-005',
    domain: 'domain2',
    tags: ['DynamoDB', 'Global Tables', 'Latency'],
    type: 'single',
    select: 1,
    question: 'グローバル展開するモバイルゲームでは、ユーザープロファイルとセッション状態を低レイテンシで読み書きする必要があります。ユーザーは北米、欧州、アジアに分散しており、リージョン障害時にも別リージョンで継続利用できることが求められます。アプリケーションはKey-Valueアクセスが中心です。最も適切なデータストア構成はどれですか。',
    choices: [
      { id: 'A', text: 'DynamoDB Global Tablesを使用し、複数リージョンでアクティブに読み書きできるようにする。' },
      { id: 'B', text: '単一リージョンのRDS MySQLをMulti-AZ構成にし、全世界のユーザーを同じエンドポイントへ接続する。' },
      { id: 'C', text: 'S3にJSONファイルとしてプロファイルを保存し、更新時はオブジェクト全体を上書きする。' },
      { id: 'D', text: 'ElastiCacheだけに永続データを保存し、バックアップは取得しない。' }
    ],
    answer: ['A'],
    explanation: 'Key-Value中心でグローバル低レイテンシ、複数リージョンの継続利用が必要ならDynamoDB Global Tablesが適しています。RDS Multi-AZは同一リージョン内の高可用性であり、世界中の低レイテンシやリージョン障害対策には不足します。'
  },
  {
    id: 'd2-006',
    domain: 'domain2',
    tags: ['ECS', 'Fargate', 'Secrets Manager'],
    type: 'multiple',
    select: 2,
    question: '新規のコンテナベースAPIをECSで構築します。チームはEC2ホストのパッチ適用や容量管理を避けたいと考えています。また、データベース接続情報などの機密情報をコンテナイメージや環境変数の平文に埋め込まない方針です。運用負荷とセキュリティ要件を満たす対応を2つ選んでください。',
    choices: [
      { id: 'A', text: 'ECS on Fargateを使用し、タスク定義でコンテナを実行する。' },
      { id: 'B', text: 'AWS Secrets Managerに機密情報を保存し、タスクロールで必要なシークレットだけ参照させる。' },
      { id: 'C', text: 'ECS on EC2を使い、全コンテナにホストの管理者権限を付与する。' },
      { id: 'D', text: 'DockerfileにデータベースパスワードをARGとして埋め込み、ビルド時に固定する。' },
      { id: 'E', text: 'すべてのタスクに同じIAMユーザーのアクセスキーを環境変数として設定する。' }
    ],
    answer: ['A', 'B'],
    explanation: 'Fargateはサーバー管理を減らしてコンテナを実行できます。Secrets Managerとタスクロールを組み合わせることで、必要なタスクだけが機密情報を取得できます。イメージや環境変数に平文で埋め込むのは避けます。'
  },
  {
    id: 'd2-007',
    domain: 'domain2',
    tags: ['Kinesis', 'Analytics', 'S3'],
    type: 'single',
    select: 1,
    question: '広告配信基盤では、クリックイベントを秒間数十万件取り込み、ほぼリアルタイムで不正クリックの検知を行い、同時に生データをS3へ保存して後続分析に使いたいです。イベント順序はシャード単位で保てればよく、コンシューマーを複数持つ予定です。最も適切な取り込み基盤はどれですか。',
    choices: [
      { id: 'A', text: 'Kinesis Data Streamsでイベントを取り込み、リアルタイム処理コンシューマーとS3保存処理を分ける。' },
      { id: 'B', text: 'S3へ直接PUTし、S3イベント通知だけでリアルタイム検知を行う。' },
      { id: 'C', text: 'RDSに全クリックイベントを同期INSERTし、トリガーで検知処理を実行する。' },
      { id: 'D', text: 'CloudTrail Lakeへクリックイベントを送信し、管理イベントとして分析する。' }
    ],
    answer: ['A'],
    explanation: '高スループットのストリーミングデータを複数コンシューマーで処理するにはKinesis Data Streamsが適しています。S3イベント通知はオブジェクト作成後のイベントであり、秒間大量イベントのリアルタイム処理基盤としては弱くなります。'
  },
  {
    id: 'd3-004',
    domain: 'domain3',
    tags: ['RDS', 'Performance', 'Read Replica'],
    type: 'single',
    select: 1,
    question: '既存のRDS MySQLを使うレポート機能で、日中に重い集計クエリが実行されると本番アプリケーションの書き込み遅延が増えます。アプリケーションの書き込み先は変えず、レポート系の読み取り負荷を分離したいです。最小変更で改善する方法はどれですか。',
    choices: [
      { id: 'A', text: 'RDSリードレプリカを作成し、レポート機能の読み取りクエリをリードレプリカへ向ける。' },
      { id: 'B', text: '本番DBのMulti-AZスタンバイへ読み取りクエリを流す。' },
      { id: 'C', text: '本番DBのストレージタイプだけを変更し、すべてのクエリを同じプライマリで処理する。' },
      { id: 'D', text: '毎回本番DBのスナップショットを復元し、復元完了後にレポートを実行する。' }
    ],
    answer: ['A'],
    explanation: '読み取り負荷の分離にはリードレプリカが適しています。Multi-AZのスタンバイは通常読み取りに使うものではありません。スナップショット復元は即時性と運用負荷の面で不利です。'
  },
  {
    id: 'd3-005',
    domain: 'domain3',
    tags: ['S3', 'Lifecycle', 'Cost'],
    type: 'multiple',
    select: 2,
    question: '分析用ログがS3に保存されています。直近30日は頻繁に参照されますが、90日を過ぎるとほとんど参照されません。ただし監査要件により7年間保持が必要です。運用負荷を増やさず、長期保管コストを下げたい場合、適切な対応を2つ選んでください。',
    choices: [
      { id: 'A', text: 'S3 Lifecycleルールで、一定期間後に低頻度アクセスやGlacier系ストレージクラスへ移行する。' },
      { id: 'B', text: '保持期限を満たすため、7年後に削除するLifecycleルールを設定する。' },
      { id: 'C', text: 'すべてのログをS3 Standardに固定し、監査完了まで一切移行しない。' },
      { id: 'D', text: '参照頻度に関係なく毎日手動でオブジェクトを別バケットへコピーする。' },
      { id: 'E', text: 'S3バケットを削除し、CloudWatch Logsだけに保存する。' }
    ],
    answer: ['A', 'B'],
    explanation: 'S3 Lifecycleはオブジェクトのストレージクラス移行や期限切れ削除を自動化できます。アクセス頻度が下がるログは低コストなストレージクラスへ移行し、7年保持後に削除することで要件とコスト最適化を両立できます。'
  },
  {
    id: 'd3-006',
    domain: 'domain3',
    tags: ['Config', 'Security Hub', 'Remediation'],
    type: 'single',
    select: 1,
    question: 'セキュリティチームは、複数アカウントでS3バケットのパブリック公開やセキュリティグループの過剰開放を継続的に検出したいです。違反を一覧化し、可能なものは自動修復し、監査レポートにも使いたいと考えています。最も適切な組み合わせはどれですか。',
    choices: [
      { id: 'A', text: 'AWS Configでリソース設定を評価し、Security Hubに集約し、SSM Automationなどで修復アクションを実行する。' },
      { id: 'B', text: 'CloudTrailのログを月1回手動確認し、違反があれば各チームへメールする。' },
      { id: 'C', text: 'Trusted Advisorだけを使い、全リージョン全リソースの設定変更履歴を保持する。' },
      { id: 'D', text: 'Cost ExplorerでセキュリティグループとS3バケットの公開状態を確認する。' }
    ],
    answer: ['A'],
    explanation: 'AWS Configはリソース設定の継続評価に使います。Security Hubは検出結果の集約と優先度付けに適しています。SSM Automationなどを組み合わせると自動修復もできます。CloudTrailはAPI監査であり、設定準拠の継続評価そのものはConfigが適しています。'
  },
  {
    id: 'd3-007',
    domain: 'domain3',
    tags: ['Well-Architected', 'Reliability', 'RTO'],
    type: 'single',
    select: 1,
    question: 'ある業務システムは単一リージョンの複数AZで稼働しており、通常のAZ障害には耐えられます。しかし経営層から、リージョン障害時にも4時間以内に主要機能を再開する要件が追加されました。常時アクティブな別リージョン運用はコスト上難しいです。RTO要件を満たしつつコストを抑えるDR戦略として最も近いものはどれですか。',
    choices: [
      { id: 'A', text: 'ウォームスタンバイ構成を別リージョンに用意し、最小構成で常時稼働させ、障害時にスケールアウトする。' },
      { id: 'B', text: 'バックアップを同一リージョンにだけ保存し、リージョン障害時は復旧を諦める。' },
      { id: 'C', text: 'マルチサイトアクティブ/アクティブを必ず採用し、全リージョンで常時同じ容量を稼働させる。' },
      { id: 'D', text: 'DR計画は作らず、障害発生後に手順を検討する。' }
    ],
    answer: ['A'],
    explanation: 'RTO 4時間でコストも抑えたい場合、ウォームスタンバイは現実的な選択肢です。パイロットライトより復旧は速く、アクティブ/アクティブよりコストを抑えられます。RTOはRecovery Time Objective、つまり復旧時間目標です。'
  },
  {
    id: 'd4-004',
    domain: 'domain4',
    tags: ['Migration Hub', 'Discovery'],
    type: 'single',
    select: 1,
    question: '大規模移行プロジェクトの初期段階で、オンプレミスの数百台のサーバーについてCPU、メモリ、ネットワーク依存関係、稼働状況を把握したいです。アプリケーション単位で移行計画を作成し、移行状況も一元的に追跡したい場合、最初に使うべきサービスの組み合わせとして最も適切なのはどれですか。',
    choices: [
      { id: 'A', text: 'AWS Application Discovery Serviceで情報収集し、AWS Migration Hubでアプリケーション単位の移行状況を追跡する。' },
      { id: 'B', text: 'AWS Backupでオンプレミスサーバーをバックアップし、Migration HubでCPU使用率を自動推定する。' },
      { id: 'C', text: 'CloudTrailをオンプレミスにインストールし、サーバー依存関係をAPIイベントから分析する。' },
      { id: 'D', text: 'Cost Explorerでオンプレミスサーバーの稼働状況を分析し、移行優先度を決める。' }
    ],
    answer: ['A'],
    explanation: 'Application Discovery Serviceはオンプレミス環境のサーバー情報や依存関係の収集に使えます。Migration Hubは複数移行ツールの進捗をアプリケーション単位で追跡できます。'
  },
  {
    id: 'd4-005',
    domain: 'domain4',
    tags: ['Snowball', 'Data Transfer'],
    type: 'single',
    select: 1,
    question: '映像制作会社はオンプレミスにある1PB近いアーカイブデータをS3へ移行したいです。インターネット回線は細く、専用線の増強には時間がかかります。移行対象データは大容量ですが、移行中に頻繁な更新はありません。ネットワーク転送に依存せず、現実的な期間で初期移行を完了したい場合、最も適切な方法はどれですか。',
    choices: [
      { id: 'A', text: 'AWS Snowball Edgeを複数台使用してデータを物理転送し、AWS側でS3へインポートする。' },
      { id: 'B', text: '家庭用インターネット回線でS3へ直接アップロードし、失敗したファイルだけ手動で再送する。' },
      { id: 'C', text: 'DMSを使用して動画ファイルをテーブルとしてS3へ移行する。' },
      { id: 'D', text: 'CloudFrontをオンプレミスNASの前段に配置し、キャッシュされたファイルだけS3へ移す。' }
    ],
    answer: ['A'],
    explanation: 'PB級データをネットワーク帯域に依存せず移行する場合、Snow Familyが適しています。Snowball Edgeを使うと物理デバイスで大容量データをAWSへ搬送できます。DMSはデータベース移行向けです。'
  },
  {
    id: 'd4-006',
    domain: 'domain4',
    tags: ['Container Migration', 'ECR', 'ECS'],
    type: 'multiple',
    select: 2,
    question: 'オンプレミスで稼働している複数のDockerベースWebサービスをAWSへ移行します。アプリケーションコードの大幅変更は避けたいですが、ホストOSの運用負荷は下げたいです。コンテナイメージはAWS内で管理し、デプロイを標準化したいと考えています。適切な対応を2つ選んでください。',
    choices: [
      { id: 'A', text: 'コンテナイメージをAmazon ECRへ保存する。' },
      { id: 'B', text: 'Amazon ECS on Fargateへサービスをデプロイする。' },
      { id: 'C', text: '各コンテナをAMIに変換し、EC2インスタンスへ個別にインストールする。' },
      { id: 'D', text: 'EBSスナップショットにDockerイメージを保存し、各ホストで手動ロードする。' },
      { id: 'E', text: 'コンテナをLambdaレイヤーとして登録し、既存Webサービスをそのまま常時起動する。' }
    ],
    answer: ['A', 'B'],
    explanation: 'ECRはコンテナイメージのマネージドレジストリです。Fargateを使うとホストOS管理を避けてECSサービスを実行できます。AMI化や手動ロードはコンテナ運用の標準化から外れます。'
  },
  {
    id: 'd4-007',
    domain: 'domain4',
    tags: ['VMware', 'Migration', 'Hybrid'],
    type: 'single',
    select: 1,
    question: '企業はオンプレミスVMware環境で稼働する業務システムをAWSへ段階移行したいです。短期的にはVMware運用モデルを大きく変えずに移行し、既存のVMware管理ツールや運用スキルを活かしたいという制約があります。アプリケーション改修は次フェーズで行う予定です。最も適切な移行先はどれですか。',
    choices: [
      { id: 'A', text: 'VMware Cloud on AWSを使用し、既存VMwareワークロードをAWS上のSDDCへ移行する。' },
      { id: 'B', text: 'すべてのVMを即座にLambdaへ変換し、イベント駆動へ全面刷新する。' },
      { id: 'C', text: 'オンプレミスVMwareのVMDKをS3に置き、S3から直接起動する。' },
      { id: 'D', text: '既存VMware環境を廃止し、全アプリケーションをDynamoDBだけで再構築する。' }
    ],
    answer: ['A'],
    explanation: 'VMware運用モデルを維持しながらAWSへ移行する選択肢としてVMware Cloud on AWSがあります。リファクタリングやサーバーレス化は将来的には有効でも、短期的に既存運用を維持したい要件には合いません。'
  }
];
