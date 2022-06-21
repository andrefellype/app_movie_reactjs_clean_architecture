import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import loadingMainReducerClass from "./LoadingMain/loadingMain.reducer"
import msgAlertReducerClass from "./MsgAlert/msgAlert.reducer"
import userReducerClass from "./User/user.reducer"
import aboutUsReducerClass from "./AboutUs/aboutUs.reducer"
import categoryReducerClass from "./Category/category.reducer"
import directorReducerClass from "./Director/director.reducer"
import actorReducerClass from "./Actor/actor.reducer"
import countryReducerClass from "./Country/country.reducer"
import streamReducerClass from "./Stream/stream.reducer"
import movieReducerClass from "./Movie/movie.reducer"
import tvShowReducerClass from "./TvShow/tvshow.reducer"
import tvShowSeasonReducerClass from "./TvShowSeason/tvshowseason.reducer"
import tvShowEpisodeReducerClass from "./TvShowEpisode/tvshowepisode.reducer"
import myMovieReducerClass from "./MyMovie/myMovie.reducer"
import myTvShowReducerClass from "./MyTvShow/myTvShow.reducer"

const middleware = [thunk]

const rootReducer = combineReducers({
    loadingMain: loadingMainReducerClass,
    msgAlert: msgAlertReducerClass,
    userReducer: userReducerClass,
    aboutUsReducer: aboutUsReducerClass,
    categoryReducer: categoryReducerClass,
    directorReducer: directorReducerClass,
    actorReducer: actorReducerClass,
    countryReducer: countryReducerClass,
    streamReducer: streamReducerClass,
    movieReducer: movieReducerClass,
    tvShowReducer: tvShowReducerClass,
    tvShowSeasonReducer: tvShowSeasonReducerClass,
    tvShowEpisodeReducer: tvShowEpisodeReducerClass,
    myMovieReducer: myMovieReducerClass,
    myTvShowReducer: myTvShowReducerClass
})

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middleware)))

export default store