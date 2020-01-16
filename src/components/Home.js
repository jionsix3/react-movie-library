import React from 'react';
import AppDrawer from './Drawer';
import { connect } from 'react-redux';
import { popularActions } from '../actions/popular';
import { upcomingActions } from '../actions/upcoming';
import { nowPlayingActions } from '../actions/nowPlaying';
import { genresActions } from '../actions/genres';

import { Skeleton, Icon } from 'antd';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  componentDidMount() {
    this.props.getAllPopularMovies();
    this.props.getAllUpcomingMovies();
    this.props.getNowPlayingMovies();
    this.props.getGenresListType();
  }
  render() {
    return (
      <AppDrawer>
        <div className="container" style={{ margin: '20px auto' }}>
          <div className="row">
            <div className="col-6">
              <h3>Movies</h3>
            </div>
            <div className="col-6 text-right">
              <Icon type="search" style={{ fontSize: '20px' }}/>
            </div>
          </div>

          <h5>In Theaters</h5>
          <div className="scrollmenu">
            {this.props.nowPlayingLoading
              ? <Skeleton avatar active />
              : this.props.nowPlaying.map((item, index) => {
                return (
                  <span key={index}>
                    <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`} alt={item.title} />
                    <h6 className="text-center">{item.title}</h6>
                  </span>
                )
              })}
          </div>
          <div className="row" style={{ fontWeight: 'bold' }}>
            <div className="col-6">
              <h5>Upcoming</h5>
            </div>
            <div className="col-6 text-right">
              <Link to='/upcoming/movies' className="anchor">See all</Link>
            </div>
          </div>

          <div className="scrollmenu">
            {this.props.upcomingLoading
              ? <Skeleton avatar active paragraph={{ rows: 4 }} />
              : this.props.upcoming.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`} alt={item.title} />
                    <span>{item.title}</span>
                  </div>
                )
              })}
          </div>

          <div className="row" style={{ fontWeight: 'bold' }}>
            <div className="col-6">
              <h5>Popular</h5>
            </div>
            <div className="col-6 text-right">
              <Link to='/popular/movies' className="anchor">See all</Link>
            </div>
          </div>

          <div className="scrollmenu">
            {this.props.upcomingLoading
              ? <Skeleton avatar active paragraph={{ rows: 4 }} />
              : this.props.popular.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${item.poster_path}`} alt={item.title} />
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
    popular: state.popularMovies.popular,

    upcoming: state.upcomingMovies.upcoming,
    upcomingLoading: state.upcomingMovies.loading,

    nowPlaying: state.nowPlaying.nowplaying,
    nowPlayingLoading: state.nowPlaying.loading,

    genres: state.genres.genres
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllPopularMovies: () => dispatch(popularActions.getAllPopularMovies()),
    getAllUpcomingMovies: () => dispatch(upcomingActions.getAllUpComingMovies()),
    getNowPlayingMovies: () => dispatch(nowPlayingActions.getNowPlayingMovies()),
    getGenresListType: () => dispatch(genresActions.getGenresListType())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);