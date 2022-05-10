// Map room objects with users and messages
const roomMap = new Map();

roomMap.set('room1', { id: 1, msg: ['hej', 'hej du'] });
roomMap.set('room2', { id: 2, msg: ['bla', 'blabla'] });

console.log(roomMap.get('room1'));
