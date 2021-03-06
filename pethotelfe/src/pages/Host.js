import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DisplayHost from '../component/DisplayHost'
import { withStyles } from "@material-ui/core/styles";

import FilterDialog from '../component/FilterDialog'
import HostSearch from '../component/HostSearch'


const styles = theme => ({
    grow: {
      flexGrow: 1,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(3),
    },
    field: {
        marginLeft: theme.spacing(4)
    }
  });

export class Host extends Component {

    state = {
        hosts : null,
        searchNodes: ""
    }
    

   componentDidMount(){
            axios.get('http://localhost:5000/pethotel-e7d26/us-central1/api/hosts')
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    hosts : res.data
                });
            })
            .catch((err)=>{
                console.log(err);
            })
   } 

   


    render() {
        const { classes } = this.props;
        const btn = {
            margin: "10px"
        }
        let hosts = this.state.hosts ? (this.state.hosts.map((host,i)=>{
              return  <DisplayHost  key={i} host={host}/>
        })) : (<p>LOADING ....</p>);
        return (
            <div>
            <div>
                <HostSearch/>
            
            <hr style={{marginBottom:'50px', color:'#ddd'}} />

            <div>
                <Button style={btn} variant="outlined" color="primary">
                    Sort By
                </Button>

                <Button style={btn} variant="outlined" color="primary">
                   Filter   
                </Button>
            </div>

            <div style={{border: "#ddd 1px solid", margin: "20px", padding: "20px"}}>
               <FilterDialog/>
            </div>
            </div>
            

             {hosts}
            </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(Host)