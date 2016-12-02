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

將元件所依賴的module全下下載齊全

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
    <script type="text/javascript" src="image-viewer.js"></script>
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
		react.renderTree();
	</script>
</body>
```

## API


## Q&A


