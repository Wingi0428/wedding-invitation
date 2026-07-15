# 辰銘 × 宛棋｜婚禮資訊與電子喜帖

手機優先、可直接部署到 GitHub Pages 的單頁電子喜帖。

## 網站內容

- 婚禮日期倒數
- 2026 年 9 月 12 日宴客資訊
- 印月餐廳煙雨廳地址與 Google Maps
- 當日流程
- 交通與兩處停車場資訊
- 交通示意圖
- 辰銘與宛棋的旅行及生活照片
- 寵物家人：貓咪七喜、狗狗餅乾
- 加入行事曆
- PWA 離線快取
- 社群分享縮圖

## 照片檔案

照片已轉成 WebP，降低手機載入時間：

```text
assets/couple-main.webp
assets/skytree.webp
assets/universal.webp
assets/garden.webp
assets/qixi-cutout.webp
assets/qixi-close.webp
assets/qixi-window.webp
assets/biscuit.webp
```

## 修改婚宴資訊

開啟 `config.js`，即可修改：

- 日期與時間
- 場地與地址
- Google Maps 網址
- 當日流程
- 交通與停車文字

## 部署到 GitHub Pages

1. 建立 Public Repository，例如 `wedding-invitation`
2. 把本專案所有檔案上傳至 Repository 根目錄
3. 開啟 `Settings → Pages`
4. Source 選 `Deploy from a branch`
5. Branch 選 `main`
6. Folder 選 `/ (root)`
7. 儲存

網址通常是：

```text
https://你的帳號.github.io/wedding-invitation/
```

## 更新後仍顯示舊版

本版離線快取名稱為：

```js
const CACHE = "wedding-invitation-v4";
```

部署完成後，若手機仍顯示舊網站：

1. 重新整理數次
2. 關閉瀏覽器分頁後重新開啟
3. 清除該網站快取

## 隱私提醒

Public Repository 會公開姓名、婚禮資訊與照片。  
可在 `<head>` 加入以下設定以降低搜尋引擎收錄：

```html
<meta name="robots" content="noindex, nofollow">
```

這不等同於密碼保護。

## 授權

程式與原創模板採 MIT License。新人及寵物照片的權利屬照片權利人。


## v5 版面調整

- 「我們的片刻」改為「我們的旅遊回憶」
- 旅遊照片改為較長版的版面配置，減少裁切
- 「從相遇，到相守」內文更新為新版文字
- 寵物家人區塊調整為左右對稱卡片
- 移除左下貓咪生活照，將戒指照片改為下方全寬展示
- 全站照片加上統一柔和濾鏡
- 離線快取更新為 `wedding-invitation-v5`


## v6 旅遊回憶版面調整

- 上方：東京晴空塔全寬展示
- 中間：環球影城兩張照片左右排列，城堡照較寬
- 下方：保津川遊船照片全寬展示
- 新增 `assets/universal-castle.webp` 與 `assets/universal-selfie.webp`
- 離線快取更新為 `wedding-invitation-v6`
