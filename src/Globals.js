window.G = {}
window.G.debug = window.location.hash.match(/#debug/) ? true : false;
window.G.noSound = window.location.hash.match(/#noSound/) ? true : false;

window.G.connectionLineZ = -1;
window.G.interiorZ = -2;
