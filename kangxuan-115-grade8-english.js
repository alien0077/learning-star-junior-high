/* 康軒版國中英語第三、四冊（八年級）課次與重點校正。
 * 課名與語法重點依 115 學年度公開課程計畫整理。
 */
(() => {
  const catalog = window.CHAPTER_CATALOG;
  if (!catalog?.[8]?.英文) return;

  catalog[8].英文.上 = [
    ['L01','It Rained a Lot Yesterday','過去式、天氣描述'],
    ['L02','Why Didn\'t You See a Doctor?','疑問句、健康與醫療'],
    ['L03','Tina and Billy Were Looking for Water','過去進行式、敘事'],
    ['L04','I Want to Be a YouTuber','未來式、職業夢想'],
    ['L05','How Long Will We Stay in Bangkok?','未來式、旅行規劃'],
    ['L06','How Do We Get to Joe\'s House?','問路、交通方式']
  ];
  catalog[8].英文.下 = [
    ['L01','The Coat Is Lighter Than the Jacket','形容詞比較級'],
    ['L02','This Must Be the Oldest Machine in Your Store','形容詞最高級'],
    ['L03','Our Food Smells Good','使役動詞、感官動詞'],
    ['L04','Let\'s Set Up Camp Quickly','副詞、祈使句'],
    ['L05','I Felt the Ground Shaking When the Earthquake Hit','感官動詞+V-ing、災害'],
    ['L06','If We Don\'t Act Now, There Will Be More Plastic in the Ocean','條件句、環保議題']
  ];

  const guides = window.CHAPTER_STUDY_GUIDES = window.CHAPTER_STUDY_GUIDES || {};
  guides.英文 = guides.英文 || {};
  Object.assign(guides.英文, {
    'It Rained a Lot Yesterday':[
      '過去式的動詞變化：規則動詞加 -ed，不規則動詞需逐字記憶（如 rain→rained, go→went）。',
      '天氣描述常用「It + 動詞」句型，如 It rained, It was sunny，注意 be 動詞與一般動詞的區別。',
      '時間副詞 yesterday, last week, two days ago 等是判讀過去式的關鍵線索。',
      '否定句用 didn\'t + 原形動詞，疑問句用 Did + 主詞 + 原形動詞，不可混淆。',
      '常見錯誤：將 was/were 與一般動詞混用，如 "It was rain" 應改為 "It rained"。',
      '描寫天氣時可搭配温度、感受詞（cool, humid）豐富句子內容。'
    ],
    'Why Didn\'t You See a Doctor?':[
      'Why didn\'t + 主詞 + 原形動詞？用於詢問過去未做的事，回答用 Because...',
      '健康詞彙：have a cold, have a fever, have a headache, feel sick 等搭配正確動詞。',
      '疑問詞 why 引導的問句需用過去式回答，保持時態一致。',
      '建議句型 You should / shouldn\'t + 原形動詞，用於給予醫療或健康建議。',
      '常見錯誤：回答 Why didn\'t...? 時用 "I didn\'t went"，正確為 "I didn\'t go"。',
      '疾病相關片語如 take medicine, see a doctor, rest at home 需整體記憶。'
    ],
    'Tina and Billy Were Looking for Water':[
      '過去進行式結構：was/were + V-ing，表示過去某時間正在進行的動作。',
      '過去進行式與過去式的差異：進行式強調「正在」，過去式強調「已完成」。',
      'when + 過去式 / 過去進行式 的搭配：一個動作打斷另一個持續動作。',
      'while + 過去進行式 / 過去進行式：兩個動作同時進行。',
      '常見錯誤：將 was looking 寫成 was looked，進行式的 be 動詞後接 V-ing。',
      '敘事文中的時態切換：背景用過去進行式，事件用過去式。'
    ],
    'I Want to Be a YouTuber':[
      '未來式 will + 原形動詞 表示未來計畫、意願或預測。',
      'be going to + 原形動詞 表示已有計畫或意圖，比 will 更確定。',
      '職業詞彙：YouTuber, engineer, teacher, doctor 等，注意冠詞 a/an 的使用。',
      '表達夢想可用 I want to be / I hope to be / I plan to be，語氣強度不同。',
      '常見錯誤：will 後加 to（如 will to go），正確為 will go。',
      '討論職業時可搭配能力描述（I can... / I am good at...）豐富內容。'
    ],
    'How Long Will We Stay in Bangkok?':[
      'How long 用於詢問時間長度，回答用 for + 期間（for three days）。',
      'will + 原形動詞 用於旅行規劃的問答，如 We will stay / We will visit。',
      '時間表達：for two days, since Monday, from...to... 等介系詞片語。',
      '旅行詞彙：stay, visit, explore, book a hotel, take a flight 等搭配用法。',
      '常見錯誤：混淆 for 與 since 的用法，for 接期間，since 接時間點。',
      '規劃類對話需同時交代「做什麼、去哪裡、待多久、怎麼去」四個要素。'
    ],
    'How Do We Get to Joe\'s House?':[
      '問路句型：How do I/we get to...? / Where is...? / Can you tell me the way to...?',
      '方向詞彙：turn left/right, go straight, across from, next to, between...and...',
      '交通方式：by bus, by car, on foot, take the subway 等搭配與介系詞。',
      '祈使句用於指路：Go straight, turn left at the corner, it\'s on your right。',
      '常見錯誤：on foot 寫成 by foot，walk 寫成 by walk，需注意固定搭配。',
      '描述路線時依序組織：出發點→方向→地标→目的地，讓聽者能跟隨。'
    ],
    'The Coat Is Lighter Than the Jacket':[
      '形容詞比較級結構：A + is + 比較級 + than + B，如 This coat is lighter than that jacket.',
      '單音節形容詞加 -er，多音節形容詞前加 more，不規則變化需記憶（good→better）。',
      '常見不規則比較級：good→better, bad→worse, far→farther/further。',
      '比較級前可加 much, a lot, a little 等修飾詞強調差異程度。',
      '常見錯誤：比較級與 than 搭配時重複比較，如 "more better" 錯誤。',
      '描述物品時可用比較級比較大小、重量、價格、顏色等屬性。'
    ],
    'This Must Be the Oldest Machine in Your Store':[
      '形容詞最高級結構：the + 最高級 + in/of + 範圍，如 the oldest machine in the store。',
      '單音節形容詞加 -est，多音節形容詞前加 most，不規則變化需記憶（good→best）。',
      '最高級常搭配 in + 地點或 of + 群體，如 the tallest in the class。',
      'must be 表示推測語氣，用於根據線索做出合理判斷。',
      '常見錯誤：最高級前漏掉 the，或與比較級混淆使用。',
      '介紹物品時可用最高級強調特色，如 This is the most popular model.'
    ],
    'Our Food Smells Good':[
      '感官動詞 + 形容詞：smell, taste, feel, look, sound 後接形容詞，不接副詞。',
      '使役動詞 make/have/get + 受詞 + 原形動詞，表示「使/讓某人做某事」。',
      '感官動詞 + 受詞 + V-ing / 原形動詞：I heard him singing / I heard him sing。',
      '感官動詞後接形容詞描述性質（The food smells good），接副詞描述方式（He speaks softly）。',
      '常見錯誤： smell good（正確）vs. smell well（錯誤，well 用於描述嗅覺能力）。',
      '食物相關詞彙：delicious, fresh, spicy, sweet, bitter 等搭配感官動詞使用。'
    ],
    'Let\'s Set Up Camp Quickly':[
      '副詞修飾動詞，描述動作的方式、時間、頻率或程度，位置通常在動詞後或句末。',
      '祈使句以動詞原形開頭，表示命令、請求或建議，否定用 Don\'t + 原形動詞。',
      'let\'s + 原形動詞 表示提議「我們...吧」，回答可用 OK / Sure / Good idea。',
      '副詞位置：方式副詞通常放句末（run quickly），頻率副詞放 be 動詞後、一般動詞前。',
      '常見錯誤：副詞與形容詞混淆，如 "He runs quick" 應改為 "He runs quickly"。',
      '露營相關詞彙：set up camp, pitch a tent, make a fire, sleep in a sleeping bag。'
    ],
    'I Felt the Ground Shaking When the Earthquake Hit':[
      '感官動詞 + 受詞 + V-ing 表示「感覺某人/某物正在做某事」。',
      'When + 過去式 表示「當...的時候」，用於描述事件發生的時間點。',
      '災害詞彙：earthquake, typhoon, flood, tsunami 等自然災害名稱與相關動詞。',
      'feel/see/hear + V-ing 强調動作正在進行，feel/see/hear + 原形動詞 强調完整動作。',
      '常見錯誤： felt the ground shaking（正確）vs. felt the ground shake（語義不同）。',
      '災害描述時需包含時間、地點、感受與後續行動，完整敘事結構。'
    ],
    'If We Don\'t Act Now, There Will Be More Plastic in the Ocean':[
      '第一類條件句：If + 現在式, will + 原形動詞，表示真實或可能的條件與結果。',
      '環保詞彙：plastic, pollution, recycle, reduce, reuse, ocean, marine life。',
      '條件句的時態規則：if 子句用現在式表未來，主句用 will + 原形動詞。',
      '常見錯誤：if 子句中使用 will，如 "If we will not act" 應改為 "If we don\'t act"。',
      '否定條件句：If we don\'t... / If we stop... / If people continue to...',
      '環保議題討論需兼顧問題陳述、原因分析與可行行動方案。'
    ]
  });

  window.HANLIN_115_AUDIT = window.HANLIN_115_AUDIT || {};
  window.HANLIN_115_AUDIT['8:英文:上'] = {
    catalogVerified: true,
    sourceUrls: ['https://ixec.myoeoe.com.tw/products/145/XCC12820'],
    note: '康軒版國中英語第三冊（八年級上）公開目錄逐課核對；語法重點為該課核心文法。'
  };
  window.HANLIN_115_AUDIT['8:英文:下'] = {
    catalogVerified: true,
    sourceUrls: ['https://www.myoeoe.com.tw/products/145/XCC12244'],
    note: '康軒版國中英語第四冊（八年級下）公開目錄逐課核對；語法重點為該課核心文法。'
  };
})();
