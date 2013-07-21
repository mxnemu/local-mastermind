window.G = {}
window.G.debug = window.location.hash.match(/#debug/) ? true : false;
window.G.noSound = window.location.hash.match(/#noSound/) ? true : false;

window.G.leftMouseButtonIndex = 1;
window.G.rightMouseButtonIndex = 3;
window.G.doubleClickTime = 300;

window.G.buildingZ = 10;
window.G.actorZ = 5;
window.G.connectionLineZ = -1;
window.G.interiorZ = -2;
window.G.zoomToMouse = true;
