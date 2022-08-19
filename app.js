import { piecesRender } from './services/piecesRender.service'
import { pieceRender } from './sevices/piecesRender.service.js'

addEventListener( 'DOMcontentLoaded', _ => {
    piecesRender.renderPieces()
})
