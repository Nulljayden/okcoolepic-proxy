/**
 * Chess game engine
 * @version 1.0 revision #8
 * @author Stefano Gioffre'
 * @license GNU/GPL Version 3
 */

// Variables for the chess game engine
const HTML_CHESS_VERSION = '1.0 revision #8';
const HTML_CHESS_AUTHOR = 'Stefano Gioffre';
const HTML_CHESS_COPYLEFT = '2010 Stefano Gioffre';
const HTML_CHESS_LICENSE = 'GNU/GPL Version 3';
const HTML_CHESS_URL = 'http://htmlchess.sourceforge.net/';
const CHESS_ENGINE_URL = 'http://nanochess.110mb.com/';
const CANVAS_3D_ENGINE_URL = 'http://www.nihilogic.dk/';

const BOARD_SIZE = 512;
const BOARD_MARGIN = 12;
const MIN_BOARD_SIZE = 512;
const FRAME_RATE = 1000;
const DEFAULT_PROMOTION = 0;
const DEFAULT_PLY_DEPTH = 2;
const KING_POSITIONS = [0, 0];
const PIECE_TYPES = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
const PIECE_VALUES = [1, 3, 3, 5, 9, 100];
const OPPOSITE_COLORS = { white: 'black', black: 'white' };
const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
];
const STARTING_POSITION = [
  ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
  ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn']
];
const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// Regular expression for denied tag characters
const rDeniedTagChars = /(^\d)|\W/g;

// Variables for the flat chessboard
const sAlgBoxEmpty = "digit your move...";
const bCtrlIsDown = false;

// Object for the flat chessboard
let etc = {
  aBoard: [],
  aThreats: [],
  nPromotion: DEFAULT_PROMOTION,
  bFlatView: false,
  bSolidView: false,
  bBlackSide: false,
  oFlatVwArea: null,
  oSolidVwArea: null,
  aPiecesLab: null,
  bKeyCtrl: true,
  i3DWidth: BOARD_SIZE,
  i3DHeight: BOARD_SIZE,
  lookAt: function(nGetPosX, nGetPosY) { return(this.aBoard[nGetPosY * 10 + nGetPosX + 21]); },
  isValidMove: function(nPosX, nPosY, nTargetX, nTargetY) {
    //...
  },
  makeSelection: function(nSquareId, bFromSolid) {
    //...
  }
};

//... other functions and methods

const chess = (function() {
  // Variables for the 3D chessboard
  let oSolidBoard, bUseKeyboard = false, graphicsStatus = 0,

  // Variables for the 2D chessboard
  oBoardTable = null, aCoords, aFlatSquares, sLstSqColr,

  // Variables for both visualizations
  oBoardsBox, bHumanSide = true,

  // Variables for resizing
  nDeskWidth = BOARD_SIZE, nDeskHeight = BOARD_SIZE, nFlatBVMargin = BOARD_MARGIN, // theese values are modificable
  nFlatBoardSide = nDeskHeight - nFlatBVMargin, nPageX, nPageY, iBoardsBoxX, iBoardsBoxY, nDscrsX, nDscrsY, oFilm, nMinWidth = nMinHeight = MIN_BOARD_SIZE,

  // Variables for the history motion picture
  nMotionId, bMotion = false, bBoundLock = false, nFrameRate = FRAME_RATE,

  // Variables for the DOM
  oPGNBtn, oMovesSelect, oInfoBox, oCtrlForm = null, oNtfArea = null, oNtfClsAll = null, bInfoBox = false, aCloseCalls = [], iNtfs = 0;

  //...

  function newPGNHeader() {
    //...
  }

  function isThreatened(nPieceX, nPieceY, flagFromColor) {
    //...
  }

  function getInCheckPieces() {
    //...
  }

  function getPcByParams(nParamId, nWhere) {
    //...
  }

  function resetBoard() {

