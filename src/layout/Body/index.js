import Instructions from "../Instructions";
import Robot from '../../components/Robot';
import { BodyContainer } from './Body.styles';
import { useCallback, useState } from "react";

const Body = () => {
    const [robotsList, setRobotsList] = useState([]);

    const onRobots = useCallback((robots) => {
        setRobotsList(robots);
    },[]);

    return (
        <BodyContainer >
            <Instructions onRobots={onRobots} />
            <Robot robotsList={robotsList} />
        </BodyContainer>
    );
};

export default Body;
