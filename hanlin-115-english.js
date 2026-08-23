/*
 * 翰林版國中英語第一冊（七年級上）課次與學習重點校正。
 * 課名以 114 學年度公立學校課程進度交叉核對；指南是依公開課程
 * 計畫整理的學習提示，並非課文逐字轉錄。
 */
(() => {
  const catalog = window.CHAPTER_CATALOG;
  if (!catalog?.[7]?.英文) return;

  catalog[7].英文.上 = [
    ['L01', 'Who’s That Young Man?', '介紹人物與關係，練習以 Who 問人並提供適切資訊。'],
    ['L02', 'What Are These?', '用 this／that／these／those 指認事物，注意單複數與 be 動詞搭配。'],
    ['L03', 'Let’s Get Some Ideas from RoomGPT', '以 Where 問位置，運用住家空間與位置介系詞，並理解祈使句。'],
    ['L04', 'I Can Listen to Their Songs Again and Again', '以 can 表示能力與可能，並在安全情境中理解英文標示。'],
    ['L05', 'What Are You Doing?', '以現在進行式描述持續動作，並詢問時間、星期及視訊交流安排。'],
    ['L06', 'Are There Any Shelves Outside the Door?', '以 there is／are 描述學校設施與文化差異，完成肯定、否定與問答。']
  ];
  catalog[7].英文.下 = [
    ['L01', 'I Play Basketball Every Day', '以日常活動為情境，描述規律習慣與事實。'],
    ['L02', 'My Brother Gets up at Five in the Morning', '以他人作息為情境，處理現在式第三人稱與時間表達。'],
    ['L03', 'What’s the Date Today?', '在日期、節日與行程情境中正確詢問及回答日期。'],
    ['L04', 'How Much Cake Do You Want?', '在點餐與數量情境中詢問可數、不可數名詞的數量。'],
    ['L05', 'How Often Do You Clean Your Room?', '用頻率副詞與頻率問句描述日常習慣。'],
    ['L06', 'Where Were You Yesterday?', '以 yesterday 等過去時間線索，描述人在何處與過去狀態。']
  ];

  const guides = window.CHAPTER_STUDY_GUIDES = window.CHAPTER_STUDY_GUIDES || {};
  guides.英文 = guides.英文 || {};
  const exactGuides = {
    'Who’s That Young Man?': [
      '先從人名、稱謂與關係詞辨識對話中的人物，不把說話者和被介紹者混為一談。',
      'Who 的問句是在詢問人；回答須提供題目要求的身分、關係或姓名資訊。',
      'be 動詞要隨主詞的人稱與單複數改變，先找主詞再選 am、is 或 are。',
      '介紹人物時，代名詞必須和前面的名詞在人稱、單複數與性別指涉一致。',
      '讀人物介紹應分開記錄身分、關係與特徵，再回到題目找可直接支持的句子。',
      '遇到選項時，排除將人物關係倒置、加入文本未說明資訊或代名詞不一致的敘述。'
    ],
    'What Are These?': [
      '先看所指事物距離與數量，決定使用 this、that、these 或 those。',
      'these、those 後接複數名詞，答句的 be 動詞通常用 are。',
      'What is this／that 與 What are these／those 的問句單複數要和答句一致。',
      '名詞變複數時先辨認一般加 s、es 或字尾變化，不能只憑發音猜寫法。',
      '指認物品的答句要保留題幹的遠近與數量線索，不任意換成另一組指示詞。',
      '閱讀圖片或對話題前，先確認每個代名詞實際指向的物品，避免只看單一名詞。'
    ],
    'Let’s Get Some Ideas from RoomGPT': [
      '房間與住家空間詞彙要和實際位置資訊一起記，不只孤立背單字。',
      'Where is／are 的 be 動詞由後面的單數或複數主詞決定。',
      '位置介系詞與片語必須依兩個物件的相對位置判讀，例如 in、on、next to 或 between。',
      '祈使句以原形動詞開頭；否定祈使句以 Don’t 加原形動詞表達禁止或勸告。',
      '讀房間描述時，先找參照物，再依介系詞建立物件間的位置關係。',
      '角色對話的回應要同時符合位置問題與指令的語氣，不能只選單字看似相同的選項。'
    ],
    'I Can Listen to Their Songs Again and Again': [
      'can 後面接原形動詞，不隨主詞改變成第三人稱單數或加 -ing。',
      'can 的否定用 cannot 或 can’t；問句把 can 放在主詞前。',
      '回答 Can ...? 時，要依能力或允許的語意使用 Yes, ... can 或 No, ... can’t。',
      '本課情境含安全標示；解讀標示時先辨認它是在允許、禁止、提醒或警告。',
      '閱讀題須分清 can 表示能力、可能或允許的不同語意，再選擇支持最完整的答案。',
      '面對含圖示的英文標示，先讀文字與動詞，再以情境核對行為是否安全合宜。'
    ],
    'What Are You Doing?': [
      '現在進行式以 be 動詞加 V-ing 表示正在持續的動作，兩部分都不可省略。',
      '先依主詞選 am、is 或 are，再檢查動詞 -ing 的拼字變化。',
      'What are you doing? 的回答要描述正在進行的動作，而非習慣性活動。',
      '本課的時間與星期資訊要分別讀取，避免把 at、on 所對應的資訊混用。',
      '安排視訊或活動時，回應須同時核對日期、時間與地點是否能配合。',
      '題幹有 now、at the moment 或正在使用中的情境時，優先檢查是否需要現在進行式。'
    ],
    'Are There Any Shelves Outside the Door?': [
      'there is 接單數可數名詞或不可數名詞；there are 接複數可數名詞。',
      '否定句分別用 there isn’t 與 there aren’t，不能把名詞數量和 be 動詞混搭。',
      'Is there ...? 與 Are there ...? 的問答，要依名詞單複數使用 Yes, there is／are 或 No, there isn’t／aren’t。',
      '學校設施題先圈出地點與設施名詞，再判斷題目問的是存在與否、數量或位置。',
      'any 常見於否定與問句；肯定句中的 some、a／an 仍要依名詞性質選擇。',
      '比較不同學校或文化情境時，結論只能根據題目明示的設施與規則，不可自行補充。'
    ],
    'I Play Basketball Every Day': [
      '現在簡單式用於習慣、固定活動與一般事實；先用時間詞判斷是否為規律情境。',
      'I、you、we、they 作主詞時，一般動詞通常維持原形。',
      '頻率副詞的位置要與 be 動詞、一般動詞的規則一致，不能任意放在句尾。',
      '問日常活動時，先分辨題目問的是做什麼、何時做或多久做一次。',
      '閱讀作息表要同時核對人物與活動，避免把不同人的行程拼在一起。',
      '選項若只描述一次性的現在動作，通常不符合 every day 等頻率線索。'
    ],
    'My Brother Gets up at Five in the Morning': [
      '現在簡單式的第三人稱單數主詞，肯定句一般動詞需依規則加 s 或 es。',
      '否定與問句使用 does／doesn’t 時，後面的主要動詞回到原形。',
      '時間表達要分辨 at 加鐘點、in 加早午晚或較長時間範圍。',
      '描述他人作息時，先圈出主詞，避免用 I 的動詞形式回答 he 或 she 的問題。',
      '從一日行程讀題時，依時間先後排序，不以常識補足文本未出現的活動。',
      '寫作或改錯時，同一句只保留一組主要時態標記，避免 does 與 gets 同時當作動詞變化。'
    ],
    'What’s the Date Today?': [
      '日期問句要分清 date、day 與 time 所詢問的資訊不同。',
      '日期回答須包含題目要求的月、日或星期，不能只寫部分資訊。',
      '讀月曆時先確認欄位代表的月份，再找正確日期與星期的交會位置。',
      '節日、生日與活動通知題要以公告上的日期為準，不以慣例推測。',
      '英文日期的序數詞與月份拼寫需依題目形式使用，避免直接套用中文數字順序。',
      '比較兩個日期時，先比年份、月份、日期，再判斷先後或相隔時間。'
    ],
    'How Much Cake Do You Want?': [
      'How much 用於不可數名詞；How many 用於可數複數名詞。',
      '點餐與購物情境中，要先判斷名詞是否能逐一計數，再選數量問法。',
      'some 多用於肯定句或提供、請求；any 常見於否定句與一般問句。',
      '量詞後的名詞數量形式要正確，例如 a piece of cake 與 two pieces of cake。',
      '回答數量題時，單位、數字與名詞必須彼此相符，不能把不可數名詞直接加複數。',
      '閱讀菜單或價格表要分開核對品項、份量與需求，避免只抓到價格作答。'
    ],
    'How Often Do You Clean Your Room?': [
      'How often 問的是頻率，回答應使用 always、usually、sometimes、never 或明確次數。',
      '頻率副詞與一般動詞的位置不同於與 be 動詞搭配時的位置，需先辨認句型。',
      '問句中的 do／does 要和主詞一致，主要動詞維持原形。',
      '每天、每週與每月的頻率詞不可互換，作答前先比對時間範圍。',
      '從習慣調查表讀題時，確認百分比或次數對應的是哪一個人物。',
      '選擇題若問頻率，排除只回答時間點、地點或正在做什麼的選項。'
    ],
    'Where Were You Yesterday?': [
      'yesterday、last night 等明確過去時間詞出現時，先檢查是否需要過去式。',
      'be 動詞過去式依主詞使用 was 或 were，不能沿用 am、is、are。',
      'Where were you ...? 的回答要交代過去所在位置，並保持主詞與 be 動詞一致。',
      '否定句在 was／were 後加 not；問句將 was／were 移到主詞前。',
      '時間線題要分開「過去所在」和「現在所在」，不可將兩個時點混答。',
      '閱讀事件敘述時，先找人物、過去時間與地點三項資訊，再判斷選項是否完全一致。'
    ]
  };
  for (const [title, points] of Object.entries(exactGuides)) guides.英文[title] = points;

  window.HANLIN_115_AUDIT = window.HANLIN_115_AUDIT || {};
  window.HANLIN_115_AUDIT['7:英文:上'] = {
    catalogVerified: true,
    sourceUrls: [
      'https://school.tc.edu.tw/open-message/064533/get-file/68ca06a961e996c47a0e4a6f.pdf',
      'https://course.cyc.edu.tw/upfile/course114/sub1/15938924829176284.pdf'
    ],
    note: '課名與課序經公立學校 114 學年度教學進度交叉核對；學習重點依公開課程計畫整理。'
  };
  window.HANLIN_115_AUDIT['7:英文:下'] = {
    catalogVerified: true,
    sourceUrls: ['https://wjjh.tc.edu.tw/var/file/122/1122/img/691/727709217.pdf'],
    note: '課名與課序依公立學校 114 學年度第二學期課程計畫核對；逐課內容與題庫仍分別審核。'
  };
})();
