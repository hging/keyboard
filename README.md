# 键盘

记得把`1800minib.stl`和`1800t.stl`放到`src/static`下面。

访问`http://localhost:8091/index.html`。

光照：`pages/index/index.js`里搜索`directionalLight`，然后后面的`directionalLight.position.set(1, 1, 1);`可以调坐标。
可以在界面上直接调，调的时候，把`directionalLightHelper.visible = true`，可以看到光照方向。

模型在`pages/index/models`里。