import React from 'react';
import classes from './UI/square.module.css';
import { useState } from 'react';

const Square = (props) => {
    //let value = null;

    return <button className={classes.square} onClick={props.onClick} >{props.value}</button>
}

export default Square;
