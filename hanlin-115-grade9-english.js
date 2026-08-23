/* 翰林版國中英語第五、六冊（九年級）課次與重點校正。
 * 語法重點與學習摘要依 115 學年度公開課程計畫整理。
 */
(() => {
  const catalog = window.CHAPTER_CATALOG;
  if (!catalog?.[9]?.英文) return;

  catalog[9].英文.上 = [
    ['U01','Have You Decided on the Gift?','現在完成式句型、助動詞縮寫、副詞搭配'],
    ['U02','Seeing Is Believing, Isn\'t It?','附加問句（升/降調、句型變化）'],
    ['U03','People Get Excited About Halloween','情緒動詞定義與句型'],
    ['U04','Spiders Are Served as Food Here','被動語態型態、by+受詞、被動與時態搭配'],
    ['U05','Can You Tell Me What to Do?','名詞子句（that引導、wh-疑問詞引導）'],
    ['U06','They Asked Me If I Liked Taiwan','名詞子句（whether/if引導）'],
    ['U07','Studying Is Important, and So Is Taking Up a Hobby','附和句（So/Neither/Nor）'],
    ['U08','She Is the Girl Who Helps the Homeless','關係子句（主格、that用法、非限定用法）'],
    ['U09','A Girl I Met Online Asked Me Out','關係子句（受格、介係詞與所有格、分詞片語）']
  ];
  catalog[9].英文.下 = [
    ['U01','I feel lost, and so do my friends.','附和句進階、介系詞片語'],
    ['U02','I can focus neither in the morning nor at night.','not only…but also、neither…nor…、either…or…'],
    ['U03','Is AI good for learning?','名詞子句（that/wh-/if/whether引導）'],
    ['U04','Let\'s vote.','時間連接詞（as soon as, until, since, while）、關係副詞']
  ];

  const guides = window.CHAPTER_STUDY_GUIDES = window.CHAPTER_STUDY_GUIDES || {};
  guides.英文 = guides.英文 || {};
  Object.assign(guides.英文, {
    'Have You Decided on the Gift?':[
      '現在完成式結構：have/has + 過去分詞，表示過去發生且與現在有關聯的動作。',
      '助動詞縮寫：I\'ve, You\'ve, He\'s, She\'s, It\'s 注意與 is 的區分。',
      '現在完成式搭配副詞：already（肯定句）、yet（否定/疑問句）、just（強調剛完成）。',
      '常見不規則過去分詞：decided→decided, bought→bought, gone→gone 需逐字記憶。',
      '常見錯誤：現在完成式與過去式混淆，如 "I have went" 應改為 "I have gone"。',
      'decide on + 受詞 表示「決定...」，為固定搭配，不可省略介系詞。'
    ],
    'Seeing Is Believing, Isn\'t It?':[
      '附加問句規則：前句肯定→問句否定，前句否定→問句肯定，助動詞需一致。',
      '升調表示真正提問（不確定答案），降調表示確認（期待對方同意）。',
      '句型變化：isn\'t it / aren\'t they / don\'t you / won\'t he 等依主詞與時態調整。',
      'let\'s 的附加問句用 shall we，而 let us 用 will you，兩者不同。',
      '常見錯誤：附加問句的助動詞與主句不一致，如 "She can swim, doesn\'t she?"。',
      'Seeing is believing 為箴言句型，用一般現在式表達普遍真理。'
    ],
    'People Get Excited About Halloween':[
      '情緒動詞 + about / at / by + 名詞/動名詞：get excited about, be surprised at。',
      '情緒動詞的形容詞變化：excite→excited（人）/ exciting（物），此規則適用多數情緒動詞。',
      '常見情緒動詞：excited, interested, bored, worried, disappointed, surprised。',
      '情緒動詞後接 about 表原因、接 in 表參與、接 with 表伴隨對象。',
      '常見錯誤：將 excited 與 exciting 混用，如 "The movie is excited" 應改為 "exciting"。',
      'Halloween 文化詞彙：costume, trick-or-treat, pumpkin, ghost, haunted house。'
    ],
    'Spiders Are Served as Food Here':[
      '被動語態結構：be + 過去分詞 (+ by + 受詞)，主詞承受動作而非執行。',
      '被動與時態搭配：is served (現在), was served (過去), will be served (未來), has been served (完成)。',
      'by + 受詞 在受詞不重要或不明確時可省略。',
      '常見被動句型：be made in, be used for, be known as, be served with。',
      '常見錯誤：被動語態漏掉 be 動詞，如 "Spiders served" 應改為 "Spiders are served"。',
      '食物文化議題：討論不同文化的飲食禁忌時使用被動語態描述客觀事實。'
    ],
    'Can You Tell Me What to Do?':[
      '名詞子句由 that / what / how / where / when / why 等引導，在句中充當名詞角色。',
      'what to do 為「疑問詞 + to + 原形動詞」結構，用於名詞子句中。',
      'Can you tell me...? 為禮貌問句，後接名詞子句作為受詞。',
      'that 引導的名詞子句中，that 可省略（I think (that) it is good）。',
      '常見錯誤：名詞子句中使用問句語序而非直述語序，如 "What can I do" 在子句中應為 "what I can do"。',
      '名詞子句可作主詞、受詞或補語，如 What he said is true（主詞）。'
    ],
    'They Asked Me If I Liked Taiwan':[
      'whether / if 引導的名詞子句表示「是否」，用於間接問句或不確定陳述。',
      'whether 與 if 的差異：whether 後可接 or not，if 後通常不直接接 or not。',
      '轉述句中的時態後退：asked me if I liked（現在式→過去式）。',
      '間接問句用直述語序，不可用問句語序，如 "if I liked" 而非 "if did I like"。',
      '常見錯誤：whether 與 if 混用，如 "I don\'t know whether he will come or not" 正確。',
      '轉述動詞 ask, wonder, want to know 後常接 whether/if 引導的子句。'
    ],
    'Studying Is Important, and So Is Taking Up a Hobby':[
      '附和句 So + be/have/do/情態動詞 + 主詞，表示「...也是如此」。',
      '否定附和句 Neither/Nor + be/have/do/情態動詞 + 主詞，表示「...也不」。',
      '附和句的助動詞需與前句的時態與動詞類型一致。',
      'So do I = I do too, Neither do I = I don\'t either，兩者表達不同立場。',
      '常見錯誤：附和句中使用錯誤的助動詞，如 "So am I" 用於 I am tired 應改為 "So am I"（正確）。',
      '句型 "Studying is important, and so is taking up a hobby" 中 so 倒裝表並列強調。'
    ],
    'She Is the Girl Who Helps the Homeless':[
      '關係子句由 who / which / that 引導，修飾先行詞（名詞）。',
      'who 用於人的先行詞，which 用於事物，that 兩者皆可但不可用於非限定用法。',
      '主格關係子句：who/that 在子句中充當主詞，不可省略。',
      '非限定用法以逗號隔開，提供補充資訊，只能用 who/which，不可用 that。',
      '常見錯誤：關係代名詞與先行詞重複，如 "The girl who she helps..." 應去掉 she。',
      'the homeless 為「the + 形容詞」表複數名詞，指「無家可歸的人們」。'
    ],
    'A Girl I Met Online Asked Me Out':[
      '受格關係子句：whom/that/省略 在子句中充當受詞時可省略關係代名詞。',
      'A girl (that/whom) I met online：省略 that/whom 後句子仍然完整。',
      'ask someone out 表示「約某人出去」，為動詞片語的固定搭配。',
      '分詞片語可簡化關係子句：who helps → helping, that I met → met。',
      '常見錯誤：受格關係子句中多餘的代名詞，如 "The book that I read it" 應去掉 it。',
      '介係詞與關係代名詞：The girl to whom I talked / The girl (who/whom) I talked to。'
    ],
    'I feel lost, and so do my friends.':[
      '附和句進階：So + 助動詞 + 主詞 用於肯定附和，助動詞隨主詞與時態變化。',
      '介系詞片語：feel lost in（在...中感到迷失），為感官動詞 + 介系詞的搭配。',
      'so 用於附和句時倒裝，用於結果子句時不倒裝（It was raining, so we stayed home）。',
      '人稱與助動詞配合：I feel→so do my friends（第三人稱複數用 do）。',
      '常見錯誤：附和句中主詞位置錯誤，如 "So my friends do" 應改為 "So do my friends"。',
      'feel lost 可指物理上迷路或心理上迷茫，閱讀時依語境判斷意義。'
    ],
    'I can focus neither in the morning nor at night.':[
      'neither…nor… 連接兩個對等成分，表示「既不...也不...」，動詞就近原則。',
      'not only…but also… 表示「不但...而且...」，also 可省略，重點在 but 後的資訊。',
      'either…or… 表示「不是...就是...」，用於二選一的情境。',
      '就近原則：動詞與 nor/but also 後的主詞一致，如 Neither he nor I am wrong。',
      '常見錯誤：neither…nor… 搭配時動詞用複數，如 "Neither the teacher nor the students is" 應改為 "are"。',
      '三個連接詞的語氣強度：not only…but also 最強，either…or 居中，neither…nor 最弱。'
    ],
    'Is AI good for learning?':[
      '名詞子句可作主詞，如 Whether AI is good for learning is a question。',
      'that 引導的名詞子句作主詞時，可用 it 作虛主詞：It is important that we learn.',
      'wh-疑問詞引導的名詞子句保持直述語序：I don\'t know what he is doing.',
      'if/whether 引導的名詞子句表示「是否」，在句中作受詞時可互換。',
      '常見錯誤：名詞子句中使用問句語序，如 "I wonder where does he live" 應改為 "where he lives"。',
      'AI 相關詞彙：artificial intelligence, machine learning, algorithm, data。'
    ],
    'Let\'s vote.':[
      '時間連接詞 as soon as 表示「一...就...」，連接兩個緊接發生的動作。',
      'until 表示「直到...為止」，用於否定句時表示「直到...才」。',
      'since 表示「自從」，主句用現在完成式，since 從句用過去式。',
      'while 表示「當...時候」，後接過去進行式，強調動作的持續性。',
      '關係副詞 when, where, why 引導關係子句，分別修飾時間、地點、原因。',
      '常見錯誤：since 從句中使用完成式，如 "Since I have moved here" 應改為 "Since I moved here"。'
    ]
  });

  window.HANLIN_115_AUDIT = window.HANLIN_115_AUDIT || {};
  window.HANLIN_115_AUDIT['9:英文:上'] = {
    catalogVerified: true,
    sourceUrls: ['https://www.hanlin.com.tw/products/115/ENG5'],
    note: '翰林版國中英語第五冊（九年級上）公開目錄逐課核對；語法重點為該課核心文法。'
  };
  window.HANLIN_115_AUDIT['9:英文:下'] = {
    catalogVerified: true,
    sourceUrls: ['https://www.hanlin.com.tw/products/115/ENG6'],
    note: '翰林版國中英語第六冊（九年級下）公開目錄逐課核對；語法重點為該課核心文法。'
  };
})();
