import { RobotsLabel } from './robot.style';

const Robot = ({ robotsList }) => {
    
    const getRobotList = () => {
        return robotsList.map(robot => (
            <div>{robot.x} {robot.y} {robot.orientation} {robot.isLost && 'LOST'}</div>  
        ));
    }

    return (
        <div>
            <RobotsLabel>{'Robots:'}</RobotsLabel>
            {getRobotList()}
        </div>
    );
}; 

export default Robot;