import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import { Button,Row,Col,Form,Image } from 'react-bootstrap';

export default class TechnicalReport extends Component {
    constructor(props){
        super(props);
        this.state={
            userReports:[],
            laptoptypes:[],
            issues:[],
            modalTitle:"",
            UserID:0,
            LaptopType:"",
            Issue:"",
            Notes:"",
            SerialNumber:"",
            DateOfReport:"",
            Nome:"",
            Email:"",

            LaptopTypeFilter:"",
            IssueFilter:"",
            DateFilter:"",
            Reports:[]
            //Picture:"other.png",
            //Endereco:process.env.REACT_APP_PICTURES

        }
    }
    FilterFn(){
        var LaptopTypeFilter=this.state.LaptopTypeFilter;
        var IssueFilter = this.state.IssueFilter;
        var DateFilter=this.state.DateFilter;

        var filteredData=this.state.Reports.filter(
            function(el){
                return el.LaptopTypeFilter.toString().toLowerCase().includes(
                    LaptopTypeFilter.toString().trim().toLowerCase()
                )||
                el.IssueFilter.toString().toLowerCase().includes(
                    IssueFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({userReports:filteredData});

    }
    
    sortResult(prop,asc){
        var sortedData=this.state.Reports.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({userReports:sortedData});
    }
    changeLaptopTypeFilter = (e)=>{
        this.state.LaptopTypeFilter=e.target.value;
        this.FilterFn();
    }
    changeIssueFilter = (e)=>{
        this.state.IssueFilter=e.target.value;
        this.FilterFn();
    }
    changeDataFilter = (e)=>{
        this.state.DataFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'userReport')
        .then(response=>response.json())
        .then(data=>{
            this.setState({userReports:data,Reports:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    changeLaptopType =(e)=>{
        this.setState({LaptopType:e.target.value});
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(process.env.REACT_APP_API+'userReport/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
    render(){
        const {
            userReports,
            laptoptypes,
            issues,
            modalTitle,
            UserID,
            LaptopType,
            Issue,
            Notes,
            SerialNumber,
            DateOfReport,
            Nome,
            Email,
        }=this.state;
        return(
            <div>
    <Table>
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">

            
            <input className="form-control m-2"
            onChange={this.changeLaptopTypeFilter}
            placeholder="Laptop Type Filter"/>
            
            <button type="button" className="btn btn-dark"
            onClick={()=>this.sortResult('LaptopType',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-dark"
            onClick={()=>this.sortResult('LaptopType',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>

            </div>
            
        </th>
        <th>
        <div className="d-flex flex-row">
        <input className="form-control m-2"
            onChange={this.changeIssueFilter}
            placeholder="Issue Filter"/>

            <button type="button" className="btn btn-dark"
            onClick={()=>this.sortResult('Issue',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16"pl>
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-dark"
            onClick={()=>this.sortResult('Issue',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            
      
        </th>
        <th>
        <div className="d-flex flex-row">
        
        <input className="form-control m-2"
    
            onChange={this.changeDataFilter}
            placeholder="Date Filter"/>

            <button type="button" className="btn btn-dark"
            onClick={()=>this.sortResult('DateOfReport',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
            
            <button type="button" className="btn btn-dark"
            onClick={()=>this.sortResult('DateOfReport',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            
        </th>
    </tr>
    </thead>
    </Table>
    <Table className="mt-4" striped bordered hover size="sm" >
                <thead style={{color:"yellowgreen", fontSize:"2rem",backgroundColor:"#c97e53"}}>
                    <tr>
                        <th>Laptop Type</th>
                        <th>Issue</th>
                        <th>Notes</th>
                        <th>Serial Number</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Picture</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody style={{fontSize:"bold"}}>
                {userReports.map(userreport=>
                        <tr key={userreport.userID}>
                            <td>{userreport.LaptopType}</td>
                            <td>{userreport.Issue}</td>
                            <td>{userreport.Notes}</td>
                            <td>{userreport.SerialNumber}</td>
                            <td>{userreport.DateOfReport}</td>
                            <td>{userreport.Nome}</td>
                            <td>{userreport.Email}</td> 
                            <td>{userreport.Picture}</td>

                            <td>
                            

                            <button type="button"
                                className="btn btn-light"
                                onClick={()=>this.deleteClick(userreport.UserID)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                            </button>

                            </td>
                        </tr>
                )}
                </tbody>
                </Table> 
            </div>
        )
    }
}
