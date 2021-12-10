import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// context 
import MainContext from "../MainContext";

// Tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// circular progress
import CircularProgress from "@material-ui/core/CircularProgress";


// style
import { ProjectCardWrapper } from "./StyledProjectCard";
import styled from "styled-components";

const ProjectCard = (props) => {

    // local state variable
    const [projectEmployees, setProjectEmployees] = useState();

     // consume context
    const { setErrorMessage } = useContext(MainContext);

    // set up useHistory
    const history = useHistory();

    // local fetch function
    useEffect(() => {
        fetch(`/employees/project/${props?._id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",// response type
                }
            })
            .then(res => res.json())
            .then(data => {
                            setProjectEmployees(data.data);
                        })
            .catch((err) => {
                                setErrorMessage(err);
                                history.push("/error");
                            });        
    }, []);    

    if (!projectEmployees){  return (
        <CircularProgressWrapper>
            <CircularProgress color="primary"/>
        </CircularProgressWrapper>                    
    )                    
    }

    
    
    // drag and drop
    const dragStart = (ev) => {
        const target = ev.target;
        ev.dataTransfer.setData("card_id", target.id);
        ev.dataTransfer.setData("card_class", target.className);

        setTimeout(() =>{
            target.style.display = "none";
        },0);
    }

    // prevents extra card pickup
    const dragOver = (ev) => {
        ev.stopPropagation();
    }

    // changes style back to block when dropped. Used for drops outside of dropzone
    const dragEnd = (ev) => {
        console.log("DROPPED");

        const target = ev.target;        
        
        target.style.display = "block";
    }

    

    // start of main return
    return (

        <ProjectCardWrapper
            id={props._id}
            className={props.className}
            draggable={props.draggable}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnd={dragEnd}
        >
            {projectEmployees ?
            <Tippy content={"On this project: " + projectEmployees.toString()}>
                <div>{ props.children }</div>
            </Tippy> : <div>{ props.children }</div> }
        </ProjectCardWrapper>
    ) // end of main return
}

const CircularProgressWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
`;


export default ProjectCard;