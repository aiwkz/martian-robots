import { MAX_INSTRUCTION, cardinalPoints } from '../settings';

let degree;
let newOrientation;
let scent = false;

const RobotOrders = (robot, instructions) => {
  let currentRobot = robot;

  const turn = (orientation, direction) => {
    const point = cardinalPoints.filter(point => point[0] === orientation.toUpperCase());
    degree = point[0][1];

    if (direction.toUpperCase() === 'R') {
      degree = (degree === 270) ? degree = 0 : degree + 90;
      newOrientation = cardinalPoints.filter(point => point[1] === degree);
      currentRobot.orientation = newOrientation[0][0];
    } else if (direction.toUpperCase() === 'L') {
      degree = (degree === 0) ? degree = 270 : degree - 90;
      newOrientation = cardinalPoints.filter(point => point[1] === degree);
      currentRobot.orientation = newOrientation[0][0];
    }
    
    return currentRobot.orientation;
  };
  
  const move = () => {
    switch (currentRobot.orientation.toUpperCase()) {
      case 'N':
        currentRobot.y = currentRobot.y + 1;
      break;
      case 'S':
        currentRobot.y = currentRobot.y - 1;
      break;
      case 'E':
        currentRobot.x = currentRobot.x + 1;
      break;
      case 'W':
        currentRobot.x = currentRobot.x - 1;
      break;
      default:
    }
    
    return currentRobot
  };

  const processMove = () => {
    if (!scent) {
      if  (
        (currentRobot.x === 0 && currentRobot.orientation.toUpperCase() === 'W') 
        || (currentRobot.x === 5 && currentRobot.orientation.toUpperCase() === 'E')
        || (currentRobot.y === 0 && currentRobot.orientation.toUpperCase() === 'S')
        || (currentRobot.y === 3 && currentRobot.orientation.toUpperCase() === 'N')
      ) {
        currentRobot.isLost = true;
        scent = true;
        return currentRobot;
      }
    }

    if  (
      ((currentRobot.x === 0 && currentRobot.orientation.toUpperCase() === 'W') 
      || (currentRobot.x === 5 && currentRobot.orientation.toUpperCase() === 'E')
      || (currentRobot.y === 0 && currentRobot.orientation.toUpperCase() === 'S')
      || (currentRobot.y === 3 && currentRobot.orientation.toUpperCase() === 'N'))
      && scent
    ) {
      return currentRobot;
    }
    
    move();
  }
  
  const earthOrders = (order) => {
    switch (order) {
      case 'L':
        turn(currentRobot.orientation, order);
        break;
      case 'R':
        turn(currentRobot.orientation, order);
        break;
      case 'F':
          processMove();
        break;
      default:
        console.log(`Invalid command received, moving to next robot.`);
    }

    return currentRobot.isLost;
  };

  const order = instructions.trim().substring(0, MAX_INSTRUCTION);

  for (let i = 0; i < order.length; i++) {
    if (earthOrders(order.charAt(i).toUpperCase()) === true) {
      break;
    }
  }

  return currentRobot;
};

export default RobotOrders;