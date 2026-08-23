/*
 * 臺南市立成功國中 115 學年度教科書決選版本。
 * 依教務處公布的「115 學年度教科書決選版本」建檔；該表經
 * 115 年 4 月 30 日教科書評選確認會議通過。
 *
 * 來源：https://www.ckjh.tn.edu.tw/modules/school/index.php?department_id=2&none=1&page_id=78
 * 附件：https://drive.google.com/file/d/1ecM_01mTbGywqGOS_wTEaPIaHRWgizzr/view
 */
(() => {
  const source = 'https://www.ckjh.tn.edu.tw/modules/school/index.php?department_id=2&none=1&page_id=78';
  const decidedAt = '115 年 4 月 30 日';

  window.SCHOOL_115_TEXTBOOK_EDITIONS = {
    7: { 國文:'康軒', 英文:'南一', 數學:'翰林', 自然:'翰林', 科技:'康軒', 社會:'康軒', 健教與體育:'翰林', 藝術:'康軒', 綜合:'南一', 本土語:'康軒' },
    8: { 國文:'康軒', 英文:'康軒', 數學:'翰林', 自然:'康軒', 科技:'南一', 社會:'康軒', 健教與體育:'康軒', 藝術:'康軒', 綜合:'康軒', 本土語:'真平' },
    9: { 國文:'康軒', 英文:'翰林', 數學:'翰林', 自然:'南一', 科技:'康軒', 社會:'康軒', 健教與體育:'南一', 藝術:'康軒', 綜合:'康軒' }
  };

  window.SCHOOL_115_TEXTBOOK_SOURCE = { source, decidedAt, school:'臺南市立成功國民中學' };
})();
