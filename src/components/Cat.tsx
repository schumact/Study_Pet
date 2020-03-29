import React from 'react';
import './Cat.css';
import body from "../Util/Images/body.svg";
import happy from "../Util/Images/happy.svg";
import larm from "../Util/Images/larm.svg";
import lfoot from "../Util/Images/lfoot.svg";
import rarm from "../Util/Images/rarm.svg";
import rfoot from "../Util/Images/rfoot.svg";
import sad from "../Util/Images/sad.svg";
import tail from "../Util/Images/tail.svg";

interface IProps {
    health: number;
}

const Cat: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="cat">
            {props.health > 50 ? <img src={happy} className="happy" alt="happyMood"/>
                : <img src={sad} className="sad" alt="sadMood"/>
            }
            <img src={body} className="body" width="40%" alt="body"/>
            <img src={larm} className="larm" width="45%" alt="larm"/>
            <img src={rarm} className="rarm" width="35%" alt="rarm"/>
            <img src={lfoot} className="lfoot" width="35%" alt="lfoot"/>
            <img src={rfoot} className="rfoot" width="35%" alt="rfoot"/>
            <img src={tail} className="tail" width="35%" alt="tail"/>
        </div>
    );
};

export default Cat;
