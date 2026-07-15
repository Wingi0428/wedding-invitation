// ===== 電子喜帖集中設定檔 =====
// 修改這裡即可更新網站大部分內容，不需碰主程式。

window.WEDDING_CONFIG = {
  couple: {
    groom: "辰銘",
    bride: "宛棋",
    heroMessage: "承蒙一路疼愛，共享囍悅。",
    blessing: "承蒙關愛與祝福，共沐良辰囍悅。"
  },

  event: {
    start: "2026-09-12T11:30:00+08:00",
    end: "2026-09-12T15:00:00+08:00",
    dateText: "2026 年 9 月 12 日・星期六",
    timeText: "11:30 賓客入席・11:45 準時上菜",
    venueName: "印月餐廳（南屯公益路）・煙雨廳",
    venueAddress: "408 臺中市南屯區公益路二段 818 號",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=印月餐廳%20臺中市南屯區公益路二段818號",
    calendarTitle: "辰銘與宛棋的婚禮",
    calendarDescription: "承蒙一路疼愛，共享囍悅。誠摯邀請您蒞臨印月餐廳煙雨廳，見證我們的重要時刻。"
  },

  schedule: [
    { time: "11:30", title: "賓客入席", note: "期待與您相見" },
    { time: "11:45", title: "準時上菜", note: "共享幸福與美好時光" },
    { time: "14:30", title: "家人合影", note: "留下珍貴紀念" }
  ],

  transport: {
    parking: [
      { title: "第一停車場", detail: "餐廳後方（由龍富十九街彎入）" },
      { title: "第二停車場", detail: "由龍富十九街彎入，經過餐廳後位於左側" }
    ],
    transit: [
      { title: "自行開車", detail: "國道一號 181－南屯出口 → 益豐路四段左轉 → 公益路左轉（交叉口）" },
      { title: "台中客運（朝馬）", detail: "搭乘公車 54／356／75 → 下車後步行約 11 分鐘" },
      { title: "台中車站", detail: "搭乘公車 75／81／27 → 下車後步行約 12 分鐘" },
      { title: "高鐵台中站", detail: "搭乘 160 號公車至「向上永春東七路口站」→ 步行約 14 分鐘" }
    ]
  }
};
