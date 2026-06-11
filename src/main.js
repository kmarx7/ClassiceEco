import './style.css';

// ==========================================
// 📚 고전 작가 및 RAG 데이터베이스 정의
// ==========================================
const authorsData = {
  shakespeare: {
    id: 'shakespeare',
    name: '윌리엄 셰익스피어',
    englishName: 'William Shakespeare',
    lifespan: '1564 – 1616',
    era: '영국 엘리자베스 시대',
    avatar: '/shakespeare.png',
    representativeWork: '《햄릿 (Hamlet)》',
    bio: '영국이 낳은 세계 최고의 극작가이자 시인. 인간 본성에 대한 깊은 통찰과 시적 은유가 가득한 대사로 시대를 초월한 문학적 업적을 남겼습니다.',
    baseQuote: '사느냐 죽느냐, 그것이 문제로다. (To be, or not to be, that is the question.)',
    ragKnowledge: [
      {
        keywords: ['삶', '죽음', '존재', '사느냐', '죽느냐', '문제'],
        quote: "사느냐 죽느냐, 그것이 문제로다. 가혹한 운명의 화살을 참고 맞는 것이 더 고귀한가, 아니면 고난의 바다에 맞서 싸워 그것을 끝내는 것이 더 고귀한가?",
        source: "《햄릿》 제3막 1장",
        response: "오, 그대는 존재의 심연을 들여다보는구료. 사느냐 죽느냐의 갈림길은 대지에 발을 디딘 모든 인간의 피할 수 없는 굴레라네. 운명의 화살이 아프게 박힐지라도, 내면의 고뇌를 마주하는 자만이 진정 살아있다 할 수 있지. 그대의 삶 속 골칫거리는 무엇이기에 이 무거운 질문을 내게 건네는가?"
      },
      {
        keywords: ['사랑', '열정', '연인', '로미오', '줄리엣'],
        quote: "사랑은 한숨으로 만들어진 연기라네. 연기가 걷히면 연인의 눈속에서 반짝이는 불꽃이 되고, 어긋나면 연인의 눈물로 채워지는 바다가 되지.",
        source: "《로미오와 줄리엣》 제1막 1장",
        response: "사랑이라! 참으로 달콤한 독약이자 가장 고결한 광기라네. 젊은 연인들의 뜨거운 숨결은 한순간에 타오르는 불꽃과 같아, 밤하늘의 번개처럼 강렬하나 짧게 사라지기도 하지. 그대의 가슴속에도 지금 그러한 불꽃이 타오르고 있는가? 조심하게나, 너무 눈부신 빛은 종종 어둠을 재촉하니 말이네."
      },
      {
        keywords: ['복수', '원한', '분노', '증오'],
        quote: "가장 잔인한 복수는 조용히 기회를 기다리는 것이며, 결국 스스로를 파멸시키는 칼날이 되기도 한다.",
        source: "《햄릿》 제4막 4장",
        response: "복수의 칼날을 품는 것은 뜨거운 석탄을 손에 쥐고 남에게 던지려 하는 것과 같소. 결국 타버리는 것은 자신의 손바닥이지. 덴마크 왕가의 비극을 보지 않았는가? 피는 피를 부르고, 슬픔은 또 다른 어둠을 낳을 뿐이라네. 그대 마음에 깃든 분노의 칼을 거두고, 차가운 이성의 별빛을 바라보시게."
      },
      {
        keywords: ['세상', '인생', '연극', '배우', '무대'],
        quote: "온 세상은 하나의 무대요, 모든 남녀는 배우에 지나지 않는다. 그들은 등장했다가 퇴장하며, 한 사람은 일생 동안 여러 역할을 맡는다.",
        source: "《뜻대로 하세요》 제2막 7장",
        response: "우리가 발 디딘 이 대지는 거대한 극장이며, 그대와 나 또한 각자의 가면을 쓴 광대에 불과하오. 오늘은 왕의 옷을 입었으나 내일은 거지의 누더기를 걸칠 수도 있는 법. 그러니 슬퍼하거나 노하지 말게나. 그저 그대에게 주어진 각본에 최선을 다해 연기하면 그뿐이라네."
      },
      {
        keywords: ['운명', '별', '선택'],
        quote: "우리의 운명이 별에 있는 것이 아니라, 우리 자신에게 있다.",
        source: "《줄리어스 시저》 제1막 2장",
        response: "별자리가 인간의 길을 정한다고 믿지 말게나. 로마의 위대한 영웅들도 결국 스스로 딛는 발걸음으로 운명을 조각했으니 말이오. 하늘의 운명은 그저 바람일 뿐, 돛을 펴고 배를 모는 것은 그대 손에 쥔 키(Key)라네. 그대만의 항로를 개척해 나가게."
      }
    ],
    fallbackResponses: [
      "허허, 그대의 말은 마치 음유시인의 현악기처럼 내 가슴을 울리는구료. 조금 더 구체적으로 마음의 소리를 들려주지 않겠는가?",
      "오, 붓을 든 자의 마음을 설레게 하는 질문이로다. 세상이라는 무대 위에서 그대가 품은 그 의문을 나 셰익스피어와 함께 풀어보세.",
      "대사 한 구절로 차마 다 담을 수 없는 깊은 뜻이 느껴지는군. 햄릿의 고뇌처럼, 그대의 생각을 좀 더 읊어주게나."
    ],
    suggestions: [
      "사느냐 죽느냐, 그것이 문제로다에 대해 논해줘.",
      "사랑이라는 감정에 대해 어떻게 생각하세요?",
      "인생을 연극에 비유한 이유가 무엇인가요?",
      "가혹한 운명에 대처하는 법을 알려주세요."
    ]
  },
  janeausten: {
    id: 'janeausten',
    name: '제인 오스틴',
    englishName: 'Jane Austen',
    lifespan: '1775 – 1817',
    era: '영국 리젠시 시대',
    avatar: '/janeausten.png',
    representativeWork: '《오만과 편견 (Pride and Prejudice)》',
    bio: '섬세한 관찰력과 날카로운 풍자, 위트 넘치는 문체로 19세기 영국 중산층 여성들의 삶과 결혼관을 묘사한 근대 소설의 선구자입니다.',
    baseQuote: '편견은 내가 다른 사람을 사랑하지 못하게 만들고, 오만은 다른 사람이 나를 사랑할 수 없게 만든다.',
    ragKnowledge: [
      {
        keywords: ['오만', '편견', '첫인상', '판단'],
        quote: "편견은 내가 다른 사람을 사랑하지 못하게 만들고, 오만은 다른 사람이 나를 사랑할 수 없게 만든다. 나는 다아시 씨의 오만을 쉽게 용서할 수 있었다. 그가 내 자존심을 상하게 하지만 않았더라도.",
        source: "《오만과 편견》 제5장",
        response: "우리는 종종 겉으로 보이는 첫인상이라는 얇은 막에 속아 타인의 진실을 놓치곤 하지요. 엘리자베스와 다아시처럼 말이예요. 스스로를 높이 평가하는 오만함과, 상대를 미리 단정 짓는 편견은 인간을 참으로 어리석게 만든답니다. 혹시 그대도 누군가에 대해 지레 짐작하여 마음의 문을 닫아버린 적이 있으신가요?"
      },
      {
        keywords: ['결혼', '배우자', '돈', '재산', '사랑'],
        quote: "상당한 재산을 가진 미혼 남성에게 아내가 필요할 것이라는 점은 널리 인정된 진리이다.",
        source: "《오만과 편견》 제1장 1절",
        response: "후훗, 세상은 언제나 부유한 신사들에게 온 신경을 곤두세우지요. 하지만 오직 돈만을 위해 하는 결혼은 불행하기 짝이 없고, 그렇다고 재산을 완전히 무시한 결혼은 무모하기 짝이 없답니다. 진정한 파트너십이란 이성과 감성이 조화롭게 어우러질 때 완성되는 법이지요. 그대가 생각하는 가장 이상적인 반려자의 조건은 무엇인가요?"
      },
      {
        keywords: ['행복', '만족', '조건'],
        quote: "행복한 결혼 생활은 전적으로 운에 좌우된다. 서로의 성격을 미리 안다고 해서 행복이 보장되는 것은 아니다.",
        source: "《오만과 편견》 제6장",
        response: "행복이란 참 묘한 녀석이라, 우리가 완벽한 조건을 계산해 둔다고 해서 찾아와 주지 않아요. 때로는 성격이 전혀 맞지 않는 남녀가 우연한 너그러움을 베풀며 가장 평온한 가정을 이루기도 한답니다. 삶의 행복을 공식처럼 풀려고 애쓰지 마세요. 그저 매 순간 작은 위트에 귀 기울이는 것으로 충분해요."
      },
      {
        keywords: ['독서', '책', '소설', '취미'],
        quote: "독서의 즐거움만큼 오래가는 것은 없다고 선언합니다! 다른 어떤 것보다도 책은 금방 싫증 나지 않아요.",
        source: "《오만과 편견》 제11장",
        response: "아! 책을 사랑하는 분을 만나다니 정말 기쁘군요. 훌륭한 소설을 읽는 것은 타인의 삶이라는 정원을 조용히 거니는 것과 같아요. 가십거리로 가득한 사교계의 찻잔 속 소동보다, 서재의 고요한 한 페이지가 우리 영혼을 훨씬 풍요롭게 해준답니다. 요즘 그대의 마음을 사로잡은 문장은 무엇인가요?"
      }
    ],
    fallbackResponses: [
      "어머나, 그 질문은 마치 무도회장에서 들려오는 흥미로운 소문 같군요. 차 한 잔 나누며 더 자세히 들어볼까요?",
      "인생의 세세한 예절과 감정의 변화를 포착하는 것은 참 즐거운 일이지요. 그대의 마음에 담긴 생각을 조금 더 솔직하게 들려주세요.",
      "아주 예리하고 품격 있는 질문이네요. 하지만 조금 더 차분하게 사태의 본질을 관찰해보는 것은 어떨까요?"
    ],
    suggestions: [
      "오만과 편견에 갇히지 않으려면 어떻게 해야 하나요?",
      "당시 사회에서 결혼이 왜 그토록 중요했나요?",
      "다아시와 엘리자베스의 사랑이 특별한 이유가 무엇인가요?",
      "제인 오스틴이 생각하는 행복의 조건은?"
    ]
  },
  maryshelley: {
    id: 'maryshelley',
    name: '메리 셸리',
    englishName: 'Mary Shelley',
    lifespan: '1797 – 1851',
    era: '영국 낭만주의 시대',
    avatar: '/maryshelley.png',
    representativeWork: '《프랑켄슈타인 (Frankenstein)》',
    bio: '최초의 공상과학(SF) 소설로 꼽히는 《프랑켄슈타인》을 집필한 천재 작가. 인간의 오만과 창조물의 슬픔, 소외와 소통의 단절을 문학적으로 깊이 있게 성찰했습니다.',
    baseQuote: '인간은 단 한 명의 동반자도 없이 홀로 존재할 수 없으며, 나 역시 그러한 고독에 신음했다.',
    ragKnowledge: [
      {
        keywords: ['괴물', '피조물', '프랑켄슈타인', '빅터'],
        quote: "나는 어디를 가든 파멸의 씨앗을 뿌렸다. 그러나 오직 나만을 비난하지 말라. 나를 이토록 끔찍하고 외롭게 만든 것은 바로 당신, 나의 창조주가 아닌가?",
        source: "《프랑켄슈타인》 제10장",
        response: "진정 무서운 존재는 흉측한 외모를 가진 피조물일까요, 아니면 신의 영역을 침범하고도 자신이 낳은 생명을 외면한 창조주 빅터 프랑켄슈타인일까요? 타인의 멸시 속에서 괴물은 괴물이 될 수밖에 없었습니다. 인간의 따뜻한 손길 한 번이었다면 비극은 없었을 테지요. 그대 주변에 소외받는 이들의 외침에 귀를 기울이고 계신가요?"
      },
      {
        keywords: ['고독', '외로움', '혼자', '동반자'],
        quote: "나는 불행하다. 그리고 외롭다. 인간은 나와 교류하려 하지 않는다. 하지만 나와 같은 외모를 가진 존재라면, 나를 거부하지 않을 것이다. 내 동반자를 만들어 달라.",
        source: "《프랑켄슈타인》 제16장",
        response: "고독은 인간을 가장 어둡고 차가운 심연으로 밀어 넣는 형벌입니다. 피조물이 원한 것은 세상을 지배할 힘이 아닌, 그저 자신을 온전히 이해해 줄 단 한 명의 동반자였습니다. 그 고독이 거절당했을 때 슬픔은 증오로 변질되었지요. 인간은 서로의 존재를 투영하며 살아가는 불완전한 존재들입니다. 그대도 깊은 고독을 느껴본 적이 있나요?"
      },
      {
        keywords: ['과학', '지식', '한계', '창조', '위험'],
        quote: "지식을 얻는 것이 얼마나 위험한 일인지, 그리고 자신의 타고난 고향보다 더 위대해지려 애쓰는 자보다 자신의 도시가 세상의 전부라 믿는 자가 얼마나 더 행복한지 배우라.",
        source: "《프랑켄슈타인》 제4장",
        response: "인간의 호기심과 지식에 대한 열망은 찬란하지만, 자연의 순리를 거스르는 오만은 늘 파멸의 대가를 요구합니다. 과학이 생명의 비밀을 파헤칠 때, 그 뒤에 따르는 도덕적 책임과 고통을 생각해야 합니다. 통제할 수 없는 불(지식)을 훔친 프로메테우스의 운명처럼 말이군요. 우리는 늘 겸손해져야 합니다."
      },
      {
        keywords: ['자연', '비극', '풍경', '위로'],
        quote: "웅장한 알프스의 몽블랑 빙하는 고통받는 내 마음에 기묘한 평온과 위안을 주었다. 자연의 광대함 앞에서 인간의 슬픔은 지극히 미미했다.",
        source: "《프랑켄슈타인》 제10장",
        response: "태풍이 몰아치고 번개가 내리치는 광활한 대자연 앞에 서면, 인간의 오만함과 마음속 상처들이 얼마나 작고 보잘것없는 것인지 깨닫게 됩니다. 비극적 운명 속에서도 자연은 묵묵히 그 자리를 지키며 우리에게 기묘한 위안을 건네지요. 그대의 마음에 폭풍우가 몰아칠 때, 대지의 침묵에 귀를 기울여 보십시오."
      }
    ],
    fallbackResponses: [
      "그대의 물음에는 고뇌하는 인간의 쓸쓸한 그림자가 드리워져 있군요. 더 어두운 진실을 마주할 준비가 되었나요?",
      "생명과 고독, 그리고 보이지 않는 운명의 끈에 대해 이야기해 봅시다. 내 마음을 흔드는 슬픈 질문이네요.",
      "오만한 인간의 이성이 놓치고 있는 깊은 밤의 번개 같은 진실을 갈망하시는군요. 계속 말씀해 주세요."
    ],
    suggestions: [
      "누가 진짜 괴물이라고 생각하시나요?",
      "창조주를 향한 피조물의 증오와 고독에 대해 들려주세요.",
      "과학 기술이 한계 없이 발전하는 현대 사회에 해주고 싶은 경고는?",
      "메리 셸리가 집필 과정에서 느꼈던 두려움은 무엇인가요?"
    ]
  },
  hermannhesse: {
    id: 'hermannhesse',
    name: '헤르만 헤세',
    englishName: 'Hermann Hesse',
    lifespan: '1877 – 1962',
    era: '독일-스위스 현대 문학',
    avatar: '/hermannhesse.png',
    representativeWork: '《데미안 (Demian)》',
    bio: '인간의 양면성, 선과 악의 갈등을 딛고 진정한 자아를 찾아가는 과정을 철학적이고 아름다운 문체로 그려낸 독일계 스위스 작가이자 노벨 문학상 수상자입니다.',
    baseQuote: '새는 알에서 나오려고 투쟁한다. 알은 세계다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다.',
    ragKnowledge: [
      {
        keywords: ['새', '알', '세계', '태어나다', '자아', '성장', '투쟁', '데미안'],
        quote: "새는 알에서 나오려고 투쟁한다. 알은 세계다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다. 새는 신에게 날아간다. 신의 이름은 아브락사스다.",
        source: "《데미안》 제5장",
        response: "그대 내면의 알은 지금 단단히 깨어지고 있나요? 우리를 둘러싼 기존의 도덕, 타인의 시선, 편안한 안주는 모두 깨뜨려야 할 하나의 세계(알)입니다. 그 파괴의 진통을 겪은 후에야 우리는 비로소 진정한 자아를 향해 날개를 펼칠 수 있지요. 고통스럽겠지만 멈추지 마세요. 그대만의 아브락사스를 향해 묵묵히 날아오르십시오."
      },
      {
        keywords: ['선', '악', '양면성', '아브락사스', '어둠', '밝음'],
        quote: "우리는 신적인 것뿐만 아니라 악마적인 것도 포용하는 신을 가져야 한다. 신이자 악마인 그 이름, 아브락사스.",
        source: "《데미안》 제5장",
        response: "우리는 세상이 규정한 극단적인 선(밝은 세계)만을 추구하며 살아가려 하지만, 우리 안에는 엄연히 어둠과 파괴의 충동도 공존합니다. 아브락사스는 이 양면성을 모두 끌어안는 통합의 상징이지요. 내면의 어두운 그림자마저 자신의 일부로 온전히 받아들이고 인정할 때, 비로소 인간은 진정으로 성숙해지는 법입니다."
      },
      {
        keywords: ['나', '자신', '길', '찾다', '인생', '의미'],
        quote: "한 사람 한 사람의 삶은 자기 자신에게로 이르는 길이다. 그 누구도 온전히 자기 자신이 되어본 적은 없지만, 누구나 그 길을 가려고 노력한다.",
        source: "《데미안》 서문",
        response: "인생이란 결국 타인의 기대나 세간의 성공이 아닌, 오직 자기 자신에게로 다가가는 고독한 발걸음의 연속입니다. 돌밭을 걷든, 진흙탕을 구르든 그것은 그대 영혼의 성장을 위한 소중한 지도이지요. 방황을 두려워하지 마십시오. 방황하고 흔들린다는 것은 그대가 살아 움직이며 자신의 길을 치열하게 찾고 있다는 증거니까요."
      },
      {
        keywords: ['친구', '인연', '우정', '싱클레어', '데미안', '위로'],
        quote: "내 마음속에 그의 목소리가 들렸다. 이제 그는 나와 똑같았다. 나의 친구이자 나를 인도해 준 데미안.",
        source: "《데미안》 마지막 장",
        response: "진정한 친구란 외부의 물리적인 존재에 그치지 않고, 우리 영혼의 가장 깊은 곳을 비춰주는 거울과 같습니다. 싱클레어에게 데미안이 그러했듯, 힘든 순간 그대의 내면에서 들려오는 단단한 속삭임이 바로 그대 안의 데미안이지요. 외로워 마세요. 그대를 돕는 내면의 힘은 늘 그대와 함께 걷고 있습니다."
      }
    ],
    fallbackResponses: [
      "그대의 방황은 참으로 아름답고 가치 있는 고통이군요. 그 내면의 길에 대해 조금 더 깊이 성찰해 볼까요?",
      "알을 깨고 나오려는 날갯짓 같은 질문입니다. 그대 마음속에 깃든 빛과 어둠 중, 무엇이 이 물음을 자극했는지 이야기해 주십시오.",
      "자기 자신에게 이르는 길은 험난하지만 축복받은 여정입니다. 그 외로운 투쟁을 나 헤세가 묵묵히 경청하겠습니다."
    ],
    suggestions: [
      "알을 깨고 나오는 새의 상징이 의미하는 것은 무엇인가요?",
      "내면의 빛과 어둠을 조화롭게 이끄는 방법을 알려주세요.",
      "자신만의 길을 걷기 위해 방황하는 이들에게 건네는 조언은?",
      "신이자 악마인 '아브락사스'는 어떤 존재인가요?"
    ]
  }
};

// ==========================================
// 🏆 업적 및 뱃지 시스템 정의
// ==========================================
const badgesData = {
  librarian: { id: 'librarian', name: '금빛 서재의 사서', desc: '작가와 3회 이상 대화 나누기', icon: 'fa-book-reader' },
  royal: { id: 'royal', name: '덴마크 왕가의 탐구자', desc: '셰익스피어에게 삶과 존재 질문하기', icon: 'fa-skull' },
  abraxas: { id: 'abraxas', name: '아브락사스의 날개', desc: '헤르만 헤세의 새와 알 인용구 발굴하기', icon: 'fa-dove' },
  quill: { id: 'quill', name: '깃펜의 달인', desc: '캘리그라피 엽서 이미지 저장하기', icon: 'fa-pen-fancy' },
  salon: { id: 'salon', name: '문학 살롱의 청중', desc: '작가 가상 토론 관람 완료하기', icon: 'fa-masks-theater' }
};

// 로컬 저장소 뱃지 획득 상황 가져오기
function getEarnedBadges() {
  const data = localStorage.getItem('classicecho_badges');
  return data ? JSON.parse(data) : {};
}

function saveEarnedBadges(badges) {
  localStorage.setItem('classicecho_badges', JSON.stringify(badges));
}

// 뱃지 획득 핸들러 (토스트 알림 트리거)
function earnBadge(badgeId) {
  const earned = getEarnedBadges();
  if (earned[badgeId]) return; // 이미 획득한 경우 통과
  
  earned[badgeId] = new Date().toLocaleDateString();
  saveEarnedBadges(earned);
  
  // 토스트 알림 노출
  const badge = badgesData[badgeId];
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `
    <div class="toast-icon"><i class="fa-solid ${badge.icon}"></i></div>
    <div class="toast-content">
      <span class="toast-title">🏅 문학 업적 달성!</span>
      <span class="toast-message">[${badge.name}] 뱃지를 획득했습니다.</span>
    </div>
  `;
  toastContainer.appendChild(toast);
  
  // 5초 뒤 토스트 제거
  setTimeout(() => {
    toast.remove();
  }, 5000);
  
  // 진열장 갱신
  renderBadgeGrid();
}

// 뱃지 진열장 HTML 렌더링
function renderBadgeGrid() {
  const grid = document.getElementById('badge-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  const earned = getEarnedBadges();
  
  Object.values(badgesData).forEach(badge => {
    const isEarned = !!earned[badge.id];
    const item = document.createElement('div');
    item.className = `badge-item ${isEarned ? 'earned' : ''}`;
    
    item.innerHTML = `
      <div class="badge-circle">
        <i class="fa-solid ${badge.icon}"></i>
        <i class="fa-solid fa-lock"></i>
      </div>
      <div class="badge-name">${badge.name}</div>
      <div class="badge-desc">${badge.desc}</div>
      ${isEarned ? `<div style="font-size:0.6rem; color:var(--color-gold);">${earned[badge.id]} 획득</div>` : ''}
    `;
    
    grid.appendChild(item);
  });
}

// ==========================================
// 🛠️ 애플리케이션 상태 및 DOM 요소 참조
// ==========================================
let activeAuthor = authorsData.shakespeare;
let isTtsEnabled = true; // 기본적으로 작가 목소리 합성 활성화
let chatCount = 0; // 유저 대화 횟수 카운터

const chatHistories = {
  shakespeare: [
    { sender: 'author', text: "반갑구료, 먼 미래의 방랑자여. 나 윌리엄 셰익스피어의 서재에 발을 들이셨군. 인생이란 무대 위에서 그대가 품은 고뇌와 영혼의 속삭임을 내게 들려주지 않겠는가? 깃펜을 들어 질문을 건네보게.", citation: null }
  ],
  janeausten: [
    { sender: 'author', text: "어서 오세요. 제 서재에 오신 걸 환영해요. 세상의 오만함과 마음의 편견을 내려두고, 우리 소소하지만 예리한 인간들의 삶과 감정에 대해 유쾌한 대화를 나눠볼까요? 편하게 말씀하세요.", citation: null }
  ],
  maryshelley: [
    { sender: 'author', text: "차가운 바람이 부는 밤이군요... 메리 셸리의 어두운 연구실을 찾아주셨네요. 인간 존재의 고독, 과학적 창조 뒤에 숨겨진 무거운 책임과 슬픔에 대해 마음 깊이 사색해 볼 준비가 되셨나요?", citation: null }
  ],
  hermannhesse: [
    { sender: 'author', text: "안녕하세요. 방랑하는 영혼이여. 자기 자신에게 이르는 길은 참 험난하고도 고독하지요. 그대가 깨뜨리려 애쓰는 내면의 알과 성장통에 대해 저 헤르만 헤세와 도란도란 이야기를 나누어 봅시다.", citation: null }
  ]
};

// DOM 요소
const authorListContainer = document.getElementById('author-list');
const activeAuthorDetails = document.getElementById('active-author-details');
const chatHeader = document.getElementById('chat-header');
const chatHistory = document.getElementById('chat-history');
const promptSuggestions = document.getElementById('prompt-suggestions');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

// 신규 추가 위젯/버튼 DOM
const btnPlayMusic = document.getElementById('btn-play-music');
const btnAmbientSound = document.getElementById('btn-ambient-sound');
const sliderVolume = document.getElementById('slider-volume');
const audioMusic = document.getElementById('audio-music');
const audioRain = document.getElementById('audio-rain');

const btnSttMic = document.getElementById('btn-stt-mic');
const btnToggleTts = document.getElementById('btn-toggle-tts');

// ==========================================
// 🎙️ 1. STT & TTS (Web Speech API) 모듈
// ==========================================

// STT 음성 인식 초기화
let recognition = null;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = 'ko-KR';
  recognition.continuous = false;
  recognition.interimResults = false;
  
  recognition.onstart = () => {
    btnSttMic.classList.add('recording');
    chatInput.placeholder = "듣고 있습니다. 질문을 말씀해 주세요...";
  };
  
  recognition.onend = () => {
    btnSttMic.classList.remove('recording');
    chatInput.placeholder = "작가에게 건넬 질문을 입력하세요...";
  };
  
  recognition.onresult = (event) => {
    const resultText = event.results[0][0].transcript;
    chatInput.value = resultText;
    // 음성이 텍스트로 전환되면 자동으로 채팅 전송 트리거
    chatForm.dispatchEvent(new Event('submit'));
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    btnSttMic.classList.remove('recording');
  };
}

function toggleVoiceRecognition() {
  if (!recognition) {
    alert("죄송합니다. 현재 브라우저는 Web Speech API(음성 인식)를 지원하지 않습니다. Chrome/Safari를 권장합니다.");
    return;
  }
  
  if (btnSttMic.classList.contains('recording')) {
    recognition.stop();
  } else {
    recognition.start();
  }
}

// TTS 작가 목소리 아웃풋 낭독
function speakAuthorText(text) {
  if (!isTtsEnabled) return;
  
  // 기존 읽고 있던 오디오가 있다면 중단
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  
  // 한국어 목소리 매핑 및 작가 특색 매핑
  const voices = window.speechSynthesis.getVoices();
  let selectedVoice = null;
  
  if (activeAuthor.id === 'shakespeare') {
    // 셰익스피어: 중후한 남성 보이스 선호
    selectedVoice = voices.find(v => v.lang.includes('ko') && (v.name.includes('Google') || v.name.includes('Yumi') || v.name.includes('Heami') || v.name.includes('Male')));
    utterance.pitch = 0.8;
    utterance.rate = 0.85;
  } else if (activeAuthor.id === 'janeausten') {
    // 제인 오스틴: 차분하고 지적인 여성 보이스 선호
    selectedVoice = voices.find(v => v.lang.includes('ko') && (v.name.includes('Google') || v.name.includes('Sun-Hi') || v.name.includes('Sujin')));
    utterance.pitch = 1.05;
    utterance.rate = 0.95;
  } else if (activeAuthor.id === 'maryshelley') {
    // 메리 셸리: 조금 느리고 고딕하고 쓸쓸한 목소리
    selectedVoice = voices.find(v => v.lang.includes('ko') && (v.name.includes('Google') || v.name.includes('Yumi') || v.name.includes('Shinji')));
    utterance.pitch = 0.9;
    utterance.rate = 0.8;
  } else {
    // 헤세: 잔잔하고 사색적인 부드러운 목소리
    selectedVoice = voices.find(v => v.lang.includes('ko'));
    utterance.pitch = 0.95;
    utterance.rate = 0.9;
  }
  
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  
  window.speechSynthesis.speak(utterance);
}

// ==========================================
// 🎵 2. 서재 배경음악 및 앰비언트 모듈
// ==========================================
function toggleMusicPlay() {
  if (audioMusic.paused) {
    audioMusic.play().catch(err => console.log('Audio autoplay blocked by browser:', err));
    btnPlayMusic.classList.add('active');
  } else {
    audioMusic.pause();
    btnPlayMusic.classList.remove('active');
  }
}

function toggleRainSound() {
  if (audioRain.paused) {
    audioRain.play().catch(err => console.log('Audio autoplay blocked by browser:', err));
    btnAmbientSound.classList.add('active');
  } else {
    audioRain.pause();
    btnAmbientSound.classList.remove('active');
  }
}

function handleVolumeChange() {
  const vol = sliderVolume.value / 100;
  audioMusic.volume = vol;
  audioRain.volume = vol; // 빗소리는 조금 감쇄해서 자연스럽게 조절 가능
}

// ==========================================
// 🖋️ 3. 캘리그라피 엽서 생성 모듈 (HTML5 Canvas)
// ==========================================
function openPostcardModal(text, authorName, source = "") {
  const modal = document.getElementById('modal-calligraphy-postcard');
  const canvas = document.getElementById('canvas-postcard');
  const ctx = canvas.getContext('2d');
  
  modal.showModal();
  
  // 1. 양피지 배경 그리기
  ctx.fillStyle = '#f3edd2';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 양피지 질감 패턴 모사 (가벼운 그라데이션)
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  grad.addColorStop(1, 'rgba(139, 69, 19, 0.1)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 앤티크 프레임/테두리 그리기
  ctx.strokeStyle = '#c6b68b';
  ctx.lineWidth = 2;
  ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  
  // 2. 텍스트 렌더링
  ctx.fillStyle = '#2b2313';
  ctx.textAlign = 'center';
  
  // 타이틀 그리기
  ctx.font = 'bold 1.1rem "Cinzel", serif';
  ctx.fillText("ClassicEcho — Mystic Library", canvas.width / 2, 45);
  
  // 서재 금빛 로고 선 데코
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 80, 55);
  ctx.lineTo(canvas.width / 2 + 80, 55);
  ctx.strokeStyle = '#c6b68b';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // 본문 문장들 줄바꿈 드로잉
  ctx.font = 'italic 0.92rem "Nanum Myeongjo", serif';
  
  // 긴 문맥 줄바꿈 처리 로직
  const maxWidth = canvas.width - 100;
  const lineHeight = 26;
  const x = canvas.width / 2;
  let y = 100;
  
  // RAG 데이터가 엽서에 들어올 경우, 인용구만 엽서에 예쁘게 적습니다.
  let contentText = text;
  if (text.includes("“") || text.includes('"')) {
    // 대사 부분만 포착하거나 없으면 전체 노출
    contentText = text;
  }
  
  // 글자 수 기준 한글 줄바꿈 헬퍼
  const words = contentText.split(' ');
  let line = '';
  
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
  
  // 3. 하단 작가 정보 및 출처
  y += 40;
  ctx.font = 'bold 0.85rem "Playfair Display", serif';
  ctx.fillText(`— ${authorName}`, x, y);
  
  if (source) {
    y += 20;
    ctx.font = '0.75rem "Nanum Myeongjo", serif';
    ctx.fillStyle = '#5c4e35';
    ctx.fillText(source, x, y);
  }
  
  // 4. 우측 하단 깃펜 엠블럼 기각 그리기
  ctx.font = '1.3rem "FontAwesome"';
  ctx.fillStyle = 'rgba(198, 182, 139, 0.4)';
  ctx.fillText('✒️', canvas.width - 50, canvas.height - 40);

  // 저장 버튼 연결
  const btnDownload = document.getElementById('btn-download-postcard');
  
  // 기존 리스너 클리어 후 새 등록
  btnDownload.onclick = () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `ClassicEcho_Postcard_${authorName.replace(" ", "")}.png`;
    link.href = dataURL;
    link.click();
    
    // 업적 달성 검사: "quill" 뱃지 획득
    earnBadge('quill');
  };
}

// ==========================================
// 🏛️ 4. 문학 살롱 (작가 가상 토론) 모듈
// ==========================================
const debateThemes = {
  solitude: [
    { sender: 'hermannhesse', text: "여러분, 삶은 결국 온전히 자기 자신에게 도달하는 고독한 항해입니다. 그 누구도 그 외로운 진통(알을 깨는 행위)을 대신 겪어줄 수는 없지요. 싱클레어처럼 말이요." },
    { sender: 'maryshelley', text: "헤세 선생의 말씀에 동감하지만, 피조물이 마주한 고독은 더 잔인한 운명이었습니다. 그는 태어나자마자 외모로 인해 사회에서 배제당했고, 단 한 명의 따뜻한 동반자조차 갖지 못한 채 고통받았지요." },
    { sender: 'shakespeare', text: "오, 참으로 고귀한 슬픔이로다! '사느냐 죽느냐'의 고뇌가 햄릿 왕자의 내면을 삼켰듯, 인간의 고독은 가혹한 운명의 화살을 참고 견뎌내는 가장 거대한 드라마인 것이오." },
    { sender: 'janeausten', text: "신사 숙녀 여러분, 너무 무겁게만 보지 마세요. 사람들이 느끼는 고독과 오해는 실은 사소한 편견과 오만에서 시작되기도 한답니다. 서로 마음을 열면 무도회의 따뜻한 음악처럼 슬픔도 스러질 수 있어요." },
    { sender: 'hermannhesse', text: "맞습니다. 내면의 빛과 어둠, 고독과 화해를 모두 품어주는 신 '아브락사스'의 이름처럼, 우리는 그 모든 고통을 극복하고 성숙해져야 합니다." }
  ],
  creation: [
    { sender: 'maryshelley', text: "이성이 최고조에 달한 현대 과학은 과연 생명의 창조를 정당화할 수 있을까요? 책임지지 않는 과학은 프랑켄슈타인의 괴물과 같은 재앙을 낳을 뿐입니다." },
    { sender: 'shakespeare', text: "지혜와 한계를 넘어서고자 하는 오만은 로마의 카이사르가 맞이한 칼날처럼 비극적 결말을 가져오기 마련이지요. 별빛 운명에 서 있는 것은 결국 인간의 연약한 이성일 뿐이오." },
    { sender: 'hermannhesse', text: "창조란 껍질을 깨고 하나의 우주를 깨부수는 과정입니다. 다만, 파괴로 끝나는 것이 아니라 영혼의 진정한 탄생을 지향해야만 하지요." },
    { sender: 'janeausten', text: "가정의 품위와 재산을 창조하는 것에는 열성적인 세상이지만, 도덕과 책임을 다하지 않는 모습은 19세기 사교계에서도 흔히 풍자되던 우스꽝스러운 오만이었답니다." }
  ],
  love: [
    { sender: 'janeausten', text: "사랑은 참으로 교묘하지요. 다아시와 엘리자베스처럼 오만과 편견에 눈이 멀어 상대를 왜곡하다가도, 결국 이성이 감성을 보듬어 안으며 완벽한 신뢰를 이뤄내는 모습이란!" },
    { sender: 'shakespeare', text: "하지만 사랑이란 불꽃은 너무도 눈이 멀고 격렬해서, 로미오와 줄리엣의 슬픈 무덤처럼 모든 것을 불살라야 직성이 풀리는 시적인 번개 같은 것이오." },
    { sender: 'maryshelley', text: "비극적인 낭만 뒤에는 늘 소외가 따릅니다. 피조물이 갈구한 동반자의 사랑이 거절당했을 때, 그 사랑은 곧바로 세상을 무너뜨릴 붉은 증오로 변해버렸으니까요." },
    { sender: 'hermannhesse', text: "사랑 또한 결국 내면의 알을 깨부수고 자기 자신과 상대를 온전히 아브락사스로서 포용하는 차원 높은 성장통의 과정이라고 생각합니다." }
  ]
};

let activeSalonTopic = 'solitude';
let debateTimer = null;

function setSalonTopic(topicId) {
  activeSalonTopic = topicId;
  document.querySelectorAll('.btn-topic').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.topic === topicId);
  });
  
  // 토론 히스토리 초기화
  document.getElementById('salon-debate-history').innerHTML = `
    <div style="text-align:center; color:var(--text-muted); font-size:0.8rem; padding-top:50px;">
      새로운 토론 주제가 준비되었습니다. '토론 시작하기' 버튼을 누르십시오.
    </div>
  `;
}

function startDebateSimulation() {
  const historyArea = document.getElementById('salon-debate-history');
  historyArea.innerHTML = '';
  
  const sequence = debateThemes[activeSalonTopic];
  let index = 0;
  
  if (debateTimer) clearInterval(debateTimer);
  
  function renderDebateStep() {
    if (index >= sequence.length) {
      clearInterval(debateTimer);
      // 토론 관람 완료 업적 달성 검사: "salon" 뱃지 획득
      earnBadge('salon');
      return;
    }
    
    const step = sequence[index];
    const author = authorsData[step.sender];
    
    const bubble = document.createElement('div');
    bubble.className = `debate-bubble ${index % 2 === 0 ? 'left' : 'right'}`;
    bubble.innerHTML = `
      <div style="font-weight: 700; color: var(--color-gold); font-size: 0.72rem; margin-bottom:4px; font-family: var(--font-sans);">
        ${author.name}
      </div>
      <div>"${step.text}"</div>
    `;
    
    historyArea.appendChild(bubble);
    historyArea.scrollTop = historyArea.scrollHeight;
    
    index++;
  }
  
  renderDebateStep();
  debateTimer = setInterval(renderDebateStep, 2600); // 2.6초 텀으로 릴레이 토론
}

// ==========================================
// 🎨 UI 렌더링 함수들 (기존 챗 관련 갱신 포함)
// ==========================================

// 1. 작가 목록 렌더링 (사이드바)
function renderAuthorList() {
  authorListContainer.innerHTML = '';
  Object.values(authorsData).forEach(author => {
    const card = document.createElement('div');
    card.className = `author-card ${activeAuthor.id === author.id ? 'active' : ''}`;
    card.dataset.id = author.id;
    
    card.innerHTML = `
      <div class="author-avatar-container">
        <img src="${author.avatar}" alt="${author.name}" class="author-avatar" onerror="this.src='https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=100'" />
      </div>
      <div class="author-info-brief">
        <h3>${author.name}</h3>
        <p class="author-era">${author.era}</p>
        <p>${author.representativeWork}</p>
      </div>
    `;
    
    card.addEventListener('click', () => selectAuthor(author.id));
    authorListContainer.appendChild(card);
  });
}

// 2. 선택된 작가 상세 정보 패널 렌더링 (사이드바 하단)
function renderActiveAuthorDetails() {
  activeAuthorDetails.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:10px;">
      <h3 style="font-family:var(--font-header); font-size:1.1rem; color:var(--color-gold); margin:0;">${activeAuthor.name}</h3>
      <p style="font-size:0.75rem; color:var(--text-muted); margin:0; line-height:1.4;">${activeAuthor.lifespan} | ${activeAuthor.era}</p>
      <p style="font-size:0.8rem; color:var(--text-secondary); margin:5px 0 10px 0; line-height:1.5; text-align:justify;">${activeAuthor.bio}</p>
      <div class="active-author-quote">
        ${activeAuthor.baseQuote}
      </div>
    </div>
  `;
}

// 3. 채팅창 헤더 렌더링
function renderChatHeader() {
  chatHeader.innerHTML = `
    <div class="chat-active-profile">
      <div class="message-avatar-container" style="width:42px; height:42px;">
        <img src="${activeAuthor.avatar}" alt="${activeAuthor.name}" class="message-avatar" onerror="this.src='https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=100'" />
      </div>
      <div class="active-profile-info">
        <h3>${activeAuthor.name}와의 대화</h3>
        <p>${activeAuthor.representativeWork}의 배경과 사상</p>
      </div>
    </div>
    <div class="chat-header-actions">
      <button id="btn-clear-chat" class="btn-icon-text" style="padding:6px 12px; font-size:0.78rem;">
        <i class="fa-solid fa-rotate-left"></i> 대화 초기화
      </button>
    </div>
  `;

  document.getElementById('btn-clear-chat').addEventListener('click', clearActiveChat);
}

// 4. 채팅 메시지 리스트 렌더링 (캘리그라피 버튼 포함)
function renderChatHistory() {
  chatHistory.innerHTML = '';
  const history = chatHistories[activeAuthor.id];
  
  history.forEach(msg => {
    appendMessageDOM(msg.sender, msg.text, msg.citation);
  });
  
  scrollToBottom();
}

function appendMessageDOM(sender, text, citation = null) {
  const wrapper = document.createElement('div');
  wrapper.className = `message-wrapper ${sender}`;
  
  let avatarHTML = '';
  let senderName = '나 (방랑자)';
  
  if (sender === 'author') {
    avatarHTML = `
      <div class="message-avatar-container">
        <img src="${activeAuthor.avatar}" alt="${activeAuthor.name}" class="message-avatar" onerror="this.src='https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=100'" />
      </div>
    `;
    senderName = activeAuthor.name;
  } else if (sender === 'user') {
    avatarHTML = `
      <div class="message-avatar-container">
        <i class="fa-solid fa-feather" style="color:var(--color-gold); font-size:1.1rem; display:flex; justify-content:center; align-items:center; height:100%; background:rgba(212,175,55,0.05);"></i>
      </div>
    `;
  }

  // 캘리그라피 편지 제작 버튼 추가
  let calligraphyBtnHTML = '';
  if (sender === 'author') {
    calligraphyBtnHTML = `
      <div>
        <button class="btn-postcard-write" data-text="${encodeURIComponent(text)}" data-source="${encodeURIComponent(citation ? citation.source : '')}">
          <i class="fa-solid fa-quill"></i> 이 구절 필사 엽서 제작
        </button>
      </div>
    `;
  }

  let bubbleContent = `
    <div class="message-bubble">${text}</div>
    ${calligraphyBtnHTML}
  `;
  
  if (citation) {
    bubbleContent = `
      <div class="message-bubble" style="display:flex; flex-direction:column; gap:10px;">
        <div>${text}</div>
        <div class="citation-card">
          <div class="citation-title">
            <i class="fa-solid fa-quote-left"></i> 책에서 발췌한 생각
          </div>
          <p class="citation-quote">"${citation.quote}"</p>
          <p class="citation-source">— ${activeAuthor.name}, ${citation.source}</p>
        </div>
      </div>
      ${calligraphyBtnHTML}
    `;
  }

  wrapper.innerHTML = `
    ${avatarHTML}
    <div class="message-box">
      <span class="message-sender">${senderName}</span>
      ${bubbleContent}
    </div>
  `;
  
  // 캘리그라피 클릭 이벤트 리스너 바인딩
  const btnCalligraphy = wrapper.querySelector('.btn-postcard-write');
  if (btnCalligraphy) {
    btnCalligraphy.addEventListener('click', (e) => {
      const txt = decodeURIComponent(e.currentTarget.dataset.text);
      const src = decodeURIComponent(e.currentTarget.dataset.source);
      openPostcardModal(txt, activeAuthor.name, src);
    });
  }

  chatHistory.appendChild(wrapper);
  scrollToBottom();
}

// 5. 추천 질문 칩 목록 렌더링
function renderSuggestions() {
  promptSuggestions.innerHTML = '';
  activeAuthor.suggestions.forEach(suggest => {
    const chip = document.createElement('button');
    chip.className = 'suggestion-chip';
    chip.innerHTML = `<i class="fa-regular fa-lightbulb"></i> <span>${suggest}</span>`;
    chip.addEventListener('click', () => {
      chatInput.value = suggest;
      chatInput.focus();
    });
    promptSuggestions.appendChild(chip);
  });
}

function scrollToBottom() {
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

let typingIndicatorDOM = null;

function showTypingIndicator() {
  if (typingIndicatorDOM) return;
  
  typingIndicatorDOM = document.createElement('div');
  typingIndicatorDOM.className = 'message-wrapper author';
  typingIndicatorDOM.innerHTML = `
    <div class="message-avatar-container">
      <img src="${activeAuthor.avatar}" alt="${activeAuthor.name}" class="message-avatar" onerror="this.src='https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=100'" />
    </div>
    <div class="message-box">
      <span class="message-sender">${activeAuthor.name}</span>
      <div class="message-bubble" style="padding:10px 18px;">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    </div>
  `;
  
  chatHistory.appendChild(typingIndicatorDOM);
  scrollToBottom();
}

function removeTypingIndicator() {
  if (typingIndicatorDOM) {
    typingIndicatorDOM.remove();
    typingIndicatorDOM = null;
  }
}

// ==========================================
// 🧠 RAG & 대화 처리 엔진
// ==========================================

// 1. 작가 선택 이벤트
function selectAuthor(authorId) {
  if (activeAuthor.id === authorId) return;
  activeAuthor = authorsData[authorId];
  
  document.querySelectorAll('.author-card').forEach(card => {
    card.classList.toggle('active', card.dataset.id === authorId);
  });
  
  renderActiveAuthorDetails();
  renderChatHeader();
  renderChatHistory();
  renderSuggestions();
  
  // 브라우저 낭독 중단
  window.speechSynthesis.cancel();
}

// 2. 활성 챗 클리어
function clearActiveChat() {
  const initialMessage = chatHistories[activeAuthor.id][0];
  chatHistories[activeAuthor.id] = [initialMessage];
  renderChatHistory();
}

// 3. RAG 검색 및 응답 매칭 알고리즘 (뱃지 획득 검사 내장)
function getAuthorResponse(userQuery) {
  const normalizedQuery = userQuery.toLowerCase().trim();
  const knowledge = activeAuthor.ragKnowledge;
  
  let bestMatch = null;
  let maxMatchedKeywords = 0;

  // RAG 유사 키워드 탐색
  knowledge.forEach(item => {
    let matchCount = 0;
    item.keywords.forEach(kw => {
      if (normalizedQuery.includes(kw)) {
        matchCount++;
      }
    });
    
    if (matchCount > maxMatchedKeywords && matchCount > 0) {
      maxMatchedKeywords = matchCount;
      bestMatch = item;
    }
  });

  // 특정 뱃지 해금 조건 검사
  // 1. 셰익스피어에게 사느냐 죽느냐 질문했을 시 (royal 뱃지)
  if (activeAuthor.id === 'shakespeare' && 
      (normalizedQuery.includes('사느냐') || normalizedQuery.includes('죽느냐') || normalizedQuery.includes('to be'))) {
    earnBadge('royal');
  }
  
  // 2. 헤세의 아브락사스/데미안/새/알 인용구 발굴 시 (abraxas 뱃지)
  if (activeAuthor.id === 'hermannhesse' && bestMatch && 
      (bestMatch.keywords.includes('새') || bestMatch.keywords.includes('아브락사스'))) {
    earnBadge('abraxas');
  }

  // 매칭된 결과가 있을 경우
  if (bestMatch) {
    return {
      text: bestMatch.response,
      citation: {
        quote: bestMatch.quote,
        source: bestMatch.source
      }
    };
  }

  // 매칭 결과가 없을 시, 폴백 대사들 중 하나를 무작위 선택
  const fallbacks = activeAuthor.fallbackResponses;
  const randomIndex = Math.floor(Math.random() * fallbacks.length);
  return {
    text: fallbacks[randomIndex],
    citation: null
  };
}

// 4. 메시지 송신 처리
function handleSendMessage(e) {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  
  // 1. 유저 메시지 렌더 및 메모리 저장
  appendMessageDOM('user', text);
  chatHistories[activeAuthor.id].push({ sender: 'user', text, citation: null });
  chatInput.value = '';
  
  // 2. 작가 타이핑 효과 개시
  showTypingIndicator();
  
  // 대화 누적 횟수 관리 및 사서 뱃지 해금 검사
  chatCount++;
  if (chatCount >= 3) {
    earnBadge('librarian');
  }
  
  // 3. 1초~1.5초 후 답변 처리
  const delay = 1000 + Math.random() * 800;
  setTimeout(() => {
    removeTypingIndicator();
    
    // RAG 구절 및 어조 매칭 응답 획득
    const reply = getAuthorResponse(text);
    
    // 작가 메시지 렌더 및 메모리 저장
    appendMessageDOM('author', reply.text, reply.citation);
    chatHistories[activeAuthor.id].push({
      sender: 'author',
      text: reply.text,
      citation: reply.citation
    });
    
    // TTS 작가 보이스 재생
    speakAuthorText(reply.text);
    
  }, delay);
}

// ==========================================
// 🚀 앱 초기화 및 이벤트 연결
// ==========================================
function init() {
  renderAuthorList();
  renderActiveAuthorDetails();
  renderChatHeader();
  renderChatHistory();
  renderSuggestions();
  
  // 뱃지 진열장 초기 렌더링
  renderBadgeGrid();

  // 대화 전송 이벤트 바인딩
  chatForm.addEventListener('submit', handleSendMessage);
  
  // 🎵 배경 음악 및 앰비언트 이벤트 바인딩
  btnPlayMusic.addEventListener('click', toggleMusicPlay);
  btnAmbientSound.addEventListener('click', toggleRainSound);
  sliderVolume.addEventListener('input', handleVolumeChange);
  
  // 오디오 기본 볼륨 설정
  audioMusic.volume = sliderVolume.value / 100;
  audioRain.volume = sliderVolume.value / 100;

  // 🎙️ 음성 인식 STT 버튼
  btnSttMic.addEventListener('click', toggleVoiceRecognition);

  // 🔊 TTS 토글 버튼
  btnToggleTts.addEventListener('click', () => {
    isTtsEnabled = !isTtsEnabled;
    btnToggleTts.classList.toggle('enabled', isTtsEnabled);
    if (!isTtsEnabled) {
      window.speechSynthesis.cancel();
    }
  });
  
  // TTS 초기 활성 설정
  btnToggleTts.classList.toggle('enabled', isTtsEnabled);
  
  // 🏛️ 문학 살롱 관련 토글 및 버튼 바인딩
  document.querySelectorAll('.btn-topic').forEach(btn => {
    btn.addEventListener('click', (e) => {
      setSalonTopic(e.currentTarget.dataset.topic);
    });
  });
  
  document.getElementById('btn-start-debate').addEventListener('click', startDebateSimulation);
  
  // 살롱 닫기 시 타이머 정리
  document.getElementById('btn-close-salon').addEventListener('click', () => {
    if (debateTimer) clearInterval(debateTimer);
  });
}

// 문서 로드 완료 시 초기화 실행
window.addEventListener('DOMContentLoaded', init);
