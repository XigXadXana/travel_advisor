
此项目是根据youtube的react.js教学（网址：https://www.youtube.com/watch?v=UKdQjQX1Pko）所完成的代码。
在其基础上有以下修改：
- 原代码逻辑是：如果 filteredPlaces 数组为空，它会回退到显示 places 数组中的所有项目。
  为了确保在没有满足阙值的 place 时显示空白，调整了逻辑，使其仅在 filteredPlaces 不为空时显示内容。
- 当改变 type 时，满足条件的项目会立即渲染，而不需要再次改变 rating 来触发渲染。

### 新增功能：导航按钮

在 `List` 组件中，为每个 `PlaceDetails` 子组件增加了一个导航按钮。点击导航按钮后，会在新页面中打开 Google Maps 
并显示从当前位置到所选地点的导航路线。

## 对于google maps api keys的更新
1. **修改 `public/index.html` 文件：**
   - 删除或注释掉现有的 Google Maps API `<script>` 标签。

2. **创建并使用 `GoogleMapsLoader.js` 组件：**
   - 创建一个新的组件 `GoogleMapsLoader.js` 并在其中动态加载 Google Maps API 脚本。
   - 确保在加载成功后执行所需的回调函数。

3. **在 `App.js` 中使用 `GoogleMapsLoader` 组件：**
   - 确保在应用初始化时使用该组件加载 Google Maps API。
   - 使用回调函数处理加载完成后的逻辑。

# Travel Advisor

Travel Advisor 是一个互动的旅游推荐平台，帮助用户搜索和发现附近的餐馆、酒店和景点。用户可以通过地图界面浏览地点，并根据评分和类型筛选结果。

## 功能

- 浏览地图并查看附近的餐馆、酒店和景点
- 根据评分和类型筛选地点
- 查看详细的地点信息，包括图片和评分
- 自动根据用户当前位置更新地图
- ~~计算任意点到选定地点的路线规划和耗时（待实现）~~ 待完善

## 目录结构

```
travel-advisor/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── api/
│   │   └── index.js
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── styles.js
│   │   ├── List/
│   │   │   ├── List.jsx
│   │   │   └── styles.js
│   │   ├── Map/
│   │   │   ├── Map.jsx
│   │   │   └── styles.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   ├── GoogleMapsLoader.js
│   └── ...
├── package.json
└── README.md
```

## 安装和运行

### 前提条件

## 使用指南

1. **地图浏览**：应用程序加载后会显示当前位置的地图。
2. **筛选地点**：使用页面上的筛选选项，可以根据评分和类型筛选地点。
3. **查看详情**：点击地图上的地点标记或列表中的地点项，可以查看详细信息。
4. **搜索地点**：在搜索栏输入地点名称可以搜索并定位到特定地点。

## 未来改进

- 添加路线规划和耗时计算功能
- 优化移动端显示和交互体验
- 增加更多筛选选项和排序功能

## 贡献

欢迎提出问题、建议或提交拉取请求来改进此项目。

## 许可证

此项目使用 [MIT 许可证](LICENSE)。
```
