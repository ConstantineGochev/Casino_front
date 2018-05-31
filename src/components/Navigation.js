import React, { Component } from 'react';
import Button from './Button'
import Swiper from 'react-id-swiper';
import axios from 'axios';
import {connect} from 'react-redux'
import MyModal from './Modal';
import Pointable from 'react-pointable';
import Slider from 'react-slick';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
// import ReactSwipe from 'react-swipe';
// import querystring from 'querystring';
import link1 from '../styles/images/keno_535.png';
import link2 from '../styles/images/keno_642.png';
import link3 from '../styles/images/keno_642wm.png';
import link4 from '../styles/images/keno_649.png';
import link5 from '../styles/images/greeno_542.png';



function NextArrow(props) {
  const { className, style, onClick, name } = props;
  return (
    <button
      className="waves-effect waves-light btn next_btn"
      onClick={onClick}>{name}</button>
  );
}

function PrevArrow(props) {
  const { className, style, onClick,name } = props;
  return (
    <button
      className="waves-effect waves-light btn prev_btn"
      onClick={onClick}>{name}</button>
  );
}


class Navigation extends Component {
      constructor(props){
        super()
        this.state = {
              // 'defence_code': '',
              // 'screenname': '',
              // 'player_id': '',
              'clicked':false
        }
        this.get_data = this.get_data.bind(this);
        this.animate_down = this.animate_down.bind(this)
        this.animate_up = this.animate_up.bind(this)
        
     
      }
      animate_down(){
       console.log('i am down');
         this.setState({
           'clicked': true
         });
      }
      animate_up(){
       console.log('i am up');
         this.setState({
           'clicked': false
         });
      }
        target_element = null;
      // componentDidMount(){
      //     this.target_element = document.querySelector('.slick-slider')
      // }
      // disable_scroll = () => {
      //   disableBodyScroll(this.target_element)
      // }


     async get_data() {
       const {screenname, player_id} = this.props.login.user
          const res = await axios.get(`https://` + window.location.hostname +':3000/new_path/apiv2/entry/')
          console.log(res.data.defence_code)
                      // // await this.setState({
                      // //     'defence_code': res.data.defence_code,
                      // //     'screenname': screenname,
                      // //     'player_id': player_id,
                      // //       })
                      // console.log(this.state.defence_code)
                      // console.log(this.state.player_id);
                      // console.log(this.state.screenname);
                      
                     this.open_game( player_id,res.data.defence_code,screenname)
        }
      async open_game(player_id,dc,name){
        console.log('launh url ==== %s', `https://qa2.zori.local:8154/L?playerId=${player_id}&portalCode=operator_UAH&defenceCode=${dc}&language=EN&screenName=${name}&country=BG&gameid=1&theme=green535`)
         await window.open(`https://qa2.zori.local:8154/L?playerId=${player_id}&portalCode=operator_UAH&defenceCode=${dc}&language=EN&screenName=${name}&country=BG&gameid=1&theme=green535`)
      }
      is_active = () => {
       
        return this.state.clicked ? ' active': ' inactive'
      }    

      render() {
      
        // const params = {
        //   navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        //   },
        //   backdrop: 'static',
        //   slidesPerView: 3,
        //   slidesPerColumn: 2,
        //   spaceBetween: 50,
        //   grabCursor: true,
        //   lazy: true,
        //    pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true,
        //     renderBullet: (index, className) => {
        //        return '<span class="' + className + '">' + (index + 1) + '</span>';
        // }
        //   },
        //  renderCustomPrevButton: () => <Button name="PREV" type="swiper-button-prev"/>,
        //  renderCustomNextButton: () => <Button name="NEXT" type="swiper-button-next"  />
        // }
 const settings = {
      className: "center",
      centerMode: true,
      dots: true,
      infinite: false,
      centerPadding: "60px",
      slidesToShow: 1,
      speed: 500,
      rows: 3,
      slidesPerRow: 3,    
      appendDots: dots => (
        <div>
          <ul style={{ margin: "0px" }}> {dots} </ul>
        </div>
      ),
      customPaging: i => (
        <div
          style={{
            width: "30px",
            color: "blue",
            border: "1px blue solid"
          }}
        >
          {i + 1}
        </div>
      ),
      nextArrow: <NextArrow name="Next"/>,
      prevArrow: <PrevArrow name="Prev"/>
    };
        return (
        <div>
          <MyModal />
          <Slider {...settings}>
             <Pointable onPointerDown={this.animate_down} onPointerUp={this.animate_up} onPointerLeave={this.animate_up}><div onClick={this.get_data}><img className={'image' + this.is_active()}  src={link1} alt="1" /></div></Pointable>
            <div style={{'width': '20%'}}><img className="image" src={link3} alt="1"/></div>
            <div><img className="image" src={link2} alt="1"/></div>
            <div><img className="image" src={link4} alt="1"/></div>
            <div><img className="image" src={link5} alt="1"/></div>
            <div><img className="image" src={link2} alt="1"/></div>
            <div><img className="image" src={link1} alt="1"/></div>
            <div><img className="image" src={link3} alt="1"/></div>
            <div><img className="image" src={link5} alt="1"/></div>
            <div><img className="image" src={link1} alt="1"/></div>
            <div><img className="image" src={link2} alt="1"/></div>
            <div><img className="image" src={link2} alt="1"/></div>
            <div><img className="image" src={link3} alt="1"/></div>
            <div><img className="image" src={link4} alt="1"/></div>
            <div><img className="image" src={link5} alt="1"/></div> 
           
          </Slider>
      
        </div>  
        )
      }
    }

    function map_state_to_props({login}){
      return { login }
    }

    export default connect(map_state_to_props)(Navigation)

