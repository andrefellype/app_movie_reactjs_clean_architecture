import UpdateHeaderToken from "../../components/Utils/UpdateHeaderToken"
import api from "../../core/api"
import { TOKEN_LOCAL_STORAGE } from "../../core/consts"

export const createInMyTvShowNeverWatchEpisode = (tvShowIdValue: string, tvShowSeasonIdValue: string, tvShowEpisodeIdValue: string,
    callbackSuccess: () => void, callbackError: (errorsMsg: string[]) => void) => async () => {
        UpdateHeaderToken(TOKEN_LOCAL_STORAGE, api)
        await api.get(`mytvshowepisodeneverwatch/register/${tvShowIdValue}/${tvShowSeasonIdValue}/${tvShowEpisodeIdValue}`).then(response => {
            if (response.data.status) {
                callbackSuccess()
            } else {
                callbackError(response.data.errors.map(erro => `${erro.msg}`))
            }
        }).catch(() => {
            window.location.href = "/failpage/error_api"
        })
    }