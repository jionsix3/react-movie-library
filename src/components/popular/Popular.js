import React, { Component } from 'react';
import AppDrawer from './../Drawer';
import { popularActions } from '../../actions/popular';
import { connect } from 'react-redux'
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';
class Popular extends Component {
  componentDidMount() {
    this.props.getAllPopularMovies();
  }
  render() {
    return (
      <AppDrawer>
        <div className="container">
         <div className="scrollmenu">
            {this.props.upcomingLoading
              ? <Skeleton avatar active paragraph={{ rows: 4 }} />
              : this.props.popular.map((item, index) => {
                return (
                  <div key={index}>
                    <Link to={`/popular/movie/${item.id}`}>
                      <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`} alt={item.title} />
                    </Link>
                    <span>{item.title}</span>
                  </div>
                )
              })}
          </div>
          </div>
      </AppDrawer>
    )
  }
}

const mapStateToProps = state => {
  return {
    popular: state.popularMovies.popular
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllPopularMovies: () => dispatch(popularActions.getAllPopularMovies())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popular);