import { piecesImages } from "../config/piecesImages.config";
import { intialGame } from '..config/initialGame.config.js'
import { $, $$, $$$ } from '../utils.js'

export const piecesRender = {
    piecesEventListeners: {},

    renderPieces() {
        const gameSetup = chessConfig.useInitialGame ? initialGame : potentialGame

        this.placePieceBoxNumbers()
        this.placeWhiteDownOrUp()
        this.placePiecesInPosition( gameSetup )
        this.addPiecesBoxListeners()
        this.piecesDetermine()
    },
    placePieceBoxNumber() {
        $$( chessConfig.chessPieceBoxSelector ).map( pieceBoxElement => {
            const spanElement = document.createElement( 'span' )
            spanElement.classList.add( 'piece-box-text' )
            spanElement.innerHtml = pieceBoxElement.gatAttribute( 'id' )

            pieceBoxElement.append( spanElement )
        })
    },
    placeWhiteDownOrUp() {
        const flexWrap = chessConfig.whitePLaysDown ? 'wrap' : 'wrap'
        $( chessConfig.chessTableSelector ).style.flexWrap = flexWrap
    },
}