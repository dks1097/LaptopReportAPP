import React,{Component} from 'react';
import {FloatingLabel, FormControl, FormGroup, FormLabel, InputGroup, Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { Button,Row,Col,Image } from 'react-bootstrap';

export default class UserReport extends Component {
    constructor(props){
        super(props);
        this.state={
            userReports:[],
            modalTitle:"",
            UserID:0,
            LaptopType:"",
            Issue:"",
            Notes:"",
            SerialNumber:"",
            DateOfReport:"",
            Nome:"",
            Email:"",    
        }

        //this.handleSubmit=this.handleSubmit.bind(this);
        //this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    
    refreshList(){
        fetch(process.env.REACT_APP_API+'userReport')
        .then(response=>response.json())
        .then(data=>{
            this.setState({userReports:data});
        })
    }

    componentDidMount(){
        this.refreshList();
        
    }
    onChangeNotes(e){
        this.setState({Notes:e.target.value})
    }
    addClick(){
        this.setState({
            modalTitle:"Add Report",
            UserID:0,
            LaptopType:"",
            Issue:"",
            Notes:"",
            SerialNumber:"",
            DateOfReport:"",
            Nome:"",
            Email:""
            //Picture:"other.png",
        });
    }
    /*editClick(userreport){
        this.setState({
            modalTitle:"Edit Report",
            UserID:userreport.UserID,
            LaptopType:userreport.LaptopType,
            Issue:userreport.Issue,
            Notes:userreport.Notes,
            SerialNumber:userreport.SerialNumber,
            DateOfReport:userreport.DateOfReport,
            Nome:userreport.Nome,
            Email:userreport.Email,
            //Picture:userreport.Picture,
        });
    }*/
    createClick(){
        fetch(process.env.REACT_APP_API+'userReport',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                LaptopType:this.state.LaptopType,
                Issue:this.state.Issue,
                Notes:this.state.Notes,
                SerialNumber:this.state.SerialNumber,
                DateOfReport:this.state.DateOfReport,
                Nome:this.state.Nome,
                Email:this.state.Email,
                //Picture:this.state.Picture
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
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
            <div className='container' style={{
                marginTop:"15px",
                
            }}>
                <h1 style={{
                    fontWeight:"bold",
                    marginBottom:30,
                    color:"#c97e53"
                }}>Report</h1>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                                
                            <Row className="mb-3">
                                <FloatingLabel as={Col} controlId="LaptopType" label='Laptop Type' style={{paddingLeft:"5px", color:"yellowgreen"}}>
                                    
                                    <Form.Select>
                                        <option value={1}>Lenovo P50</option>
                                        <option value={2}>Lenovo P50s</option>
                                        <option value={3}>Lenovo P51</option>
                                        <option value={4}>Lenovo P51s</option>
                                        <option value={5}>Lenovo P52</option>
                                        <option value={6}>Lenovo P52s</option>
                                    </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel as={Col} controlId="Issue" label="Issue" style={{paddingLeft:"5px", color:"yellowgreen"}}>
                                    
                                    <Form.Select>
                                        <option value={1}>Broken screen</option>
                                        <option value={2}>Broken keyboard</option>
                                        <option value={3}>Physical damage-Other</option>
                                        <option value={4}>Laptop crashing</option>
                                        <option value={5}>Software missing</option>
                                        <option value={6}>Other</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Row>    
                            

                            <InputGroup controlId='Notes'>
                            <InputGroup.Text style={{ fontSize:'large',color:"yellowgreen"}}>Notes</InputGroup.Text>
                                <FormControl type='textarea'classname ="form-control" aria-label="Notes" size="lg" placeholder='Descrive the problem'/>
                            </InputGroup>

                            <Row>
                                <FormGroup as={Col} controlId='SerialNumber'>
                                    <FormLabel style={{ fontSize:'large',color:"yellowgreen"}}>SerialNumber</FormLabel>
                                    <FormControl type='text' placeholder='Serial Number'/>
                                </FormGroup>
                                <FormGroup as={Col}controlId='DateOfReport'>
                                    <FormLabel style={{ fontSize:'large',color:"yellowgreen"}}>Data</FormLabel>
                                    <FormControl type='date' name='DateOfReport' required placeholder='Data'/>
                                </FormGroup>
                            </Row>
                            
                            

                            <FormGroup controlId='Nome'>
                                <FormLabel style={{ fontSize:'large',color:"yellowgreen"}}>Nome</FormLabel>
                                <FormControl type='text' placeholder='Nome'/>
                            </FormGroup>

                            <FormGroup controlId='Email'>
                                <FormLabel style={{ fontSize:'large',color:"yellowgreen"}}>Email</FormLabel>
                                <FormControl type='email' placeholder='name@example.com' />
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col sm={6} style={{display:"row"}}>
                        <Image width="250px" height="250px" src={this.imagesrc}  style={{borderColor:"red", }}/>
                        <Col>
                        <input style={{
                            marginTop:10,
                            color:"yellowgreen"
                            }} onChange={this.handleFileSelected}type="file"/>
                        </Col>
                        
                    </Col>
                </Row>

                
                
                <Button style={{marginTop:"15px",marginBottom:"10px",backgroundColor:"black", display:"flex"}}type='button' onClick={()=>this.setState({addModalShow:true})}>
                    Add Report
                </Button>
                
            </div>
        )
    }
}