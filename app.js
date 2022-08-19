import { piecesRender } from './services/piecesRender.service'

addEventListener( 'DOMcontentLoaded', _ => {
    piecesRender.renderPieces()
})