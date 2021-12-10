import React,{ useContext } from "react";

// Tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// context
import MainContext from "../MainContext";

// style
import {    EmployeeContainerWrapper,
            EmployeeListHeader,
            AddNav,
            EmployeeListWrapper,
            TippyWrapper,
            TippyContent} from "./StyledEmployeeList";

// componenets
import EmployeeCard from "../EmployeeCard";

// assets
import { FiPlus } from "react-icons/fi"

const EmployeeList = (props) => {

    // consume context
    const { employeeList } = useContext(MainContext);
    
    const drop = (ev) => {        
        ev.preventDefault();

        const card_id = ev.dataTransfer.getData("card_id");
        const card_class = ev.dataTransfer.getData("card_class");

        // use includes instead of "===" because the class name also has automatic extra junk
        if (card_class.includes("employeeCard")){

            const employeeCard= document.getElementById(card_id);

            employeeCard.style.display = "block";

            ev.target.appendChild(employeeCard);
        }

    }

    const dragOver = (ev) => {
        // allows the card to appear on drop. Default is to disappear.
        ev.preventDefault();
    }

    const dragLeave = (ev) => {        
        ev.preventDefault();
        console.log("LEAVING");

        // const card_id = ev.dataTransfer.getData("card_id");
        // const card_class = ev.dataTransfer.getData("card_class");

        // // use includes instead of "===" because the class name also has automatic extra junk
        // if (card_class.includes("employeeCard")){

        //     const employeeCard= document.getElementById(card_id);

        //     employeeCard.style.display = "block";

        //     ev.target.appendChild(employeeCard);
        // }

    }

    const handleClick = () => {
        

    }

    // start of main return
    return (
        <EmployeeContainerWrapper>
            <EmployeeListHeader>Employees<AddNav exact to="/addEmployee"><FiPlus/></AddNav></EmployeeListHeader>
            <EmployeeListWrapper
                        _id={props.id}
                        onDrop={drop}
                        onDragOver={dragOver}
                        onDragLeave={dragLeave}
                        className={props.className}
                        >
                { props.children }
                {employeeList.map((emp) => {                
                    // this generates a list of projects the employee is working on today
                    const keyList = Object.keys(emp.projects);
                    const todaysProjects = keyList.filter((key) => {
                        return ( emp.projects[key].filter((keyDate) => {
                            return Date(keyDate) === Date();})    
                        )}                
                    )      
                    return  (                            
                                <EmployeeCard _id={emp._id} className="employeeCard" draggable="true" >                                
                                    <TippyWrapper content={<div><p>Today: </p><TippyContent>{todaysProjects.toString()}</TippyContent></div>}>
                                        <div>
                                            <p>{emp._id}</p>
                                            <p>{emp.firstName} {emp.lastName}</p> 
                                        </div>
                                    </TippyWrapper>                                
                                </EmployeeCard>                           
                            )
                })}
            </EmployeeListWrapper>
        </EmployeeContainerWrapper>
    ) // end of main return
}

export default EmployeeList;