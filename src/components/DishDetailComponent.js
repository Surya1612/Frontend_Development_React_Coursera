import React,{Component} from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Modal,ModalHeader,ModalBody,Row,Col, Label,Button} from 'reactstrap'
import {Control,LocalForm,Errors} from 'react-redux-form';
import Loader from './LoaderComponent';
import { baseUrl } from '../shared/baseUrl';




const required = (val) => val && val.length; 
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

export  class CommentForm extends Component{

    constructor(props){
      super(props);

      this.state = {
        isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        
        console.log("Current State is: " + JSON.stringify(values));
        //alert("Current State is: " + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    render(){
        return(
            <React.Fragment>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-comments fa-lg"></span> Submit Comment
            </Button>


            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
                <ModalBody>

                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>


                        <Row className="form-group">
                            <Label htmlFor="rating" md={12} >Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating"
                                    className="form-control"
                                    name="rating"
                                    id="rating"
                                    validators={{
                                        required
                                    }}
                                >
                                    <option>Please Select</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Col>
                        </Row>



                        <Row className="form-group">
                            <Label htmlFor="author" md={12}> Your Name </Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="First Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>



                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                    }}
                                />
                                
                            </Col>

                        </Row>

                        {/* submit button */}
                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>

                    </LocalForm>

                </ModalBody>
            </Modal>

</React.Fragment>
        );
    }
}



function RenderDish({dish}){
    return(
     
       <div className='col-12 col-md-5 m-1'>
          <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
     </div>
  
      );
     }

 function RenderComments({comments, addComment, dishId,commentsErrMess}) {
    
   if(comments !=null){
    return (

       <div className='col-12 col-md-5 m-1'>
            <h4>Comments</h4>
               <ul className="list-unstyled">
               {comments.map((comment) => {
                  return (
                     <li key={comment.id}>
                       <p>{comment.comment}</p>
                       <p>-- {comment.author} , 
                       {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>                                      
                     </li>
                  );
                })}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
       </div>
    )
   }else{
    return(
        <div></div>
    )
   }
}


const   DishDetail=(props)=>{
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loader />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return(

         <div className='container'>
                  <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
          <div className='row'>
          <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                      addComment={props.addComment}
                      dishId={props.dish.id}
                     />
                      
                    </div>
         </div>
         </div>

        )
    }else{
        return(
            <div></div>
        )
    }
}

export default DishDetail;