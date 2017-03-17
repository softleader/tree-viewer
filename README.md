# SoftLeader Tree Viewer

> 階層瀏覽元件，包含了新增、刪除功能

## Getting started

### Node.js

本元件會利用 `npm` 進行打包, 執行前請先安裝 LTS v6.x 版本 [Node.js](https://nodejs.org/en/), 安裝方式參考:

- [Installing Node.js via Installer](https://nodejs.org/en/download/current/)
- [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/)

### Git

本元件的版本控管系統使用 GitHub: [SoftLeader-Tree-Viewer](https://github.com/softleader/tree-viewer), 此為 private 專案, 客戶必須提供 GitHub 帳號授權 read 權限, 即可透過下述方式下載程式碼:

- 使用 Git clone, 需安裝: [Git](https://git-scm.com/)
- 透過 GitHub 網站使用瀏覽器下載

## Structure

```
.
├── js // 程式碼
│   └── +
├── public // 靜態資源
│   └── +
├── scripts // 打包scripts
│   └── +
├── build // 打包目錄
├── README.md
├── index.html
├── package.json

```

## Build

### Install Scripts

下載程式碼放到`{project_dir}`後, `$ cd {project_dir}`, 則可執行:

### `npm install`

將元件所依賴的module全部下載齊全

### `npm run watch`

開發模式: 自動監控程式碼, 當有任何異動後, 自動重新build

### `npm run start`

開啟開發模式 + 啟動 http server, 可以直接開啟瀏覽器: `http://localhost:3000`

> 請先確認你電腦 3000 port 沒有被佔用

### `npm run build`

將元件最佳化後打包到 `build`資料夾下, 以提供 production 使用

## Usage

### Import JS

在你要使用元件的那個頁面中載入元件: `tree-viewer.js` 及 `bootstrap.css` 以及 `react-treeview.css`

```html
<!DOCTYPE html>

<html>
  <head>
    <title>...</title>
    <link rel="stylesheet" type="text/css" href="bootstrap.css">
	<link rel="stylesheet" type="text/css" href="react-treeview.css">
    <script type="text/javascript" src="tree-viewer.js"></script>
  </head>

	...
</html>
```

### 啟用 

使用`react.renderTree(...)`來載入Tree

```html
<body>
	<div id="showTree"></div>
	    
	<script type="text/javascript">
		react.renderTree({contextObj});
	</script>
</body>
```

#### contextObj 參數


| Field        | Required? | Type | Description |
| ------------ |-----------|------|-------------|
| name | N | String | 這個 tree 的名字 |
| getAjaxObj | Y | Object | ajax 中 get 方法的 json 資料。依照傳入的 dn 搜尋底下所有的 dn，需回傳陣列。|
| deleteAjaxObj | Y | Object | ajax 中 delete 方法的 json 資料。依照傳入的 dn 將此 dn 刪除。|
| postAjaxObj | Y | Object | ajax 中 post 方法的 json 資料。依照傳入的 dn 新增此 dn。|
| initTreeDatas | N | Array | 一開始預先 initial 的 tree 陣列。|
| component | N | Object | 目前此物件有兩個參數。一個是 DropDown，另一個是 TreeList。若設定 DropDown: true 代表要顯示 DropDwon 這個 component。預設都是 true|
| rdnMapping | Y | Obj | 每一個 rdn 對應的中文名稱。如： {uid: 人員, ou: 組織}|


## API

目前提供的 method:

| Method Name | Input | Type | Description |
| -------- |----------|------|-------------|
| react.initTreeDatas | [dn1,dn2,...] | array | 重新 initial 整個 tree 的 dn 陣列|



## Q&A


