import { piecesImages } from "../config/piecesImages.config"
import { chessConfig } from '../config/chessConfig.config'
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
        const flexWrap = chessConfig.whitePLaysDown ? 'wrap' : 'wrap-reverse'
        $( chessConfig.chessTableSelector ).style.flexWrap = flexWrap
    },
    placePiecesInPosition( gameSetup ) {
        for ( const piecePosition in gameSetup ) {
            const pieceType = gameSetup[ piecePosition ]
            const pieceImageLocation = piecesImages [ pieceType ]

            const imgElement = document.createElement( 'img' )
            imgElement.classList.add( 'piece' )
            imgElement.setAttribute( 'piece-type', pieceType )
            imgElement.src = `${ pieceImageLocation }` 

            $( `#${ piecePosition }` ).append( imgElement )
        }
    },
    addPiecesBoxListeners() {
        $$( chessConfig.chessPieceBoxSelector ).forEach( pieceBoxElement => {
            const pieceBoxPosition = pieceBoxElement.getAttribute( 'id ')
            const pieceElement = $$$( pieceBoxElement, chessConfig.chessPieceBoxSelector )
            const pieceType = pieceElement?.getAttribute( 'piece-type' ) ?? null

            const handleParams = {
                pieceBoxElement,
                pieceBoxPosition,
                pieceElement,
                pieceType
            }

            this.piecesEventListeners[ pieceBoxPosition ] = {
                'mouseenter': _ => {
                    piecesHandle.handlePiecesMouseenter( handleParams )
                },
                'mouseLeave': _ => {
                    piecesHandle.handlePiecesMouseleave( handleParams )
                },
                'click' : _ => {
                    piecesHandle.handlePiecesClick( handleParams )
                }
            }

            pieceBoxElement.addEventListener( 'mouseenter', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseenter' ])
            pieceBoxElement.addEventListener( 'mouseleave', this.piecesEventListeners[ pieceBoxPosition][ 'mouseleave' ])
            pieceBoxElement.addEventListener( 'click', this.piecesEventListeners[ pieceBoxPosition ][ 'click' ])
        })
    },
    restPiecesBoxListeners() {
        $$( chessConfig.chessPieceBoxSelector ).forEach( pieceBoxElement => {
            const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )
            
            pieceBoxElement.removeEventListener( 'mouseenter', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseenter' ])
            pieceBoxElement.removeEventListener( 'mouseleave', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseleave' ])
            pieceBoxElement.removeEventListener( 'click', this.piecesEventListeners[ pieceBoxPosition ][ 'click' ])
        })
    },
    piecesDetermine() {
        this.piecesDetermine.generateDetermination()
    },

    getCurrentGameSetup() {
        return $$( chessConfig.chessPieceSelector ).
            map( pieceElement => ({
                pieceType: pieceElement.getAttribute( 'piece-type' ),
                piecePosition: pieceElement.closest( chessConfig.chessPieceBoxSelector ).getAttribute( 'id' )
            })).
            reduce( (obj, { pieceType, piecePosition } ) => {
                obj[ piecePosition ] = pieceType
                return obj
            }, {})
    }
}

window.piecesRender = piecesRender