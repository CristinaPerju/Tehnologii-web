import React, { useState } from 'react'

function RobotForm(props) {
    const [robot, setRobot] = useState({
        name: '',
        type: '',
        mass: ''
    })

    async function addRobot() {
        if (parseInt(robot.mass) < 500) {
            props.onAdd({ ...robot, mass: '' });
        } else {
            props.onAdd(robot);
        }
    }

    function set(property, value) {
		const record = {...robot};
		record[property] = value;
		setRobot(record);
	}
    return (
        <form onSubmit={addRobot}>
            <label>Name</label>
            <input type="text" placeholder='name' value={robot.name}
					onChange={event => set('name', event.target.value)}/>

            <label>Type</label>
            <input type="text" placeholder='type' value={robot.type}
					onChange={event => set('type', event.target.value)}/>
        
            <label>Mass</label>
            <input type="text" placeholder='mass' value={robot.mass}
					onChange={event => set('mass', event.target.value)}/>
        
            <input type="submit" value="add" />
        </form>
    )
}

export default RobotForm