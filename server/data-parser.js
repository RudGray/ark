const parser = {
    parseMap(map) {
        return map;
    },
    parseGameObject(obj) {
        obj.x = utils.withGrid(obj.x);
        obj.y = utils.withGrid(obj.y);
        // ... add other conversions as needed
      
        return obj;
    },
    parseCutsceneSpace(cutsceneSpace) {
        cutsceneSpace.x = utils.withGrid(cutsceneSpace.x);
        cutsceneSpace.y = utils.withGrid(cutsceneSpace.y);
        // ... add other conversions as needed
        
        return cutsceneSpace;
    },
    parseWall(wall) {
        wall.x = utils.withGrid(wall.x);
        wall.y = utils.withGrid(wall.y);
        
        return wall;
    },
    parseMap(map) {
        map.gameObjects = map.gameObjects.map(utils.parseGameObject);
        map.cutsceneSpaces = map.cutsceneSpaces.map(utils.parseCutsceneSpace);
        map.walls = map.walls.map(utils.parseWall);

        return map;
    }
}

module.exports = parser;
