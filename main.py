import pygame

pygame.init()
WIDTH = 800
HEIGHT = 800
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Arnold Chess Engine')
timer = pygame.time.Clock()
fps = 60

white_pieces = ['r', 'n', 'b', 'q', 'k', 'b', 'n',
                'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p']
black_pieces = ['r', 'n', 'b', 'q', 'k', 'b', 'n',
                'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p']

white_positions = [(0, 7), (1, 7), (2, 7), (3, 7), (4, 7), (5, 7), (6, 7), (7, 7),
                   (0, 6),  (1, 6),  (2, 6),  (3, 6),  (4, 6),  (5, 6),  (6, 6),  (7, 6),]
black_positions = [(0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (5, 0), (6, 0), (7, 0),
                   (0, 1),  (1, 1),  (2, 1),  (3, 1),  (4, 1),  (5, 1),  (6, 1),  (7, 1),]

white_rook = pygame.image.load('assets/white_rook.png')
black_rook = pygame.image.load('assets/black_rook.png')

white_knight = pygame.image.load('assets/white_knight.png')
black_knight = pygame.image.load('assets/black_knight.png')

white_bishop = pygame.image.load('assets/white_bishop.png')
black_bishop = pygame.image.load('assets/black_bishop.png')

white_king = pygame.image.load('assets/white_king.png')
black_king = pygame.image.load('assets/black_king.png')

white_queen = pygame.image.load('assets/white_queen.png')
black_queen = pygame.image.load('assets/black_queen.png')

white_pawn = pygame.image.load('assets/white_pawn.png')
black_pawn = pygame.image.load('assets/black_pawn.png')

white_pieces_images = [white_bishop, white_king,
                       white_knight, white_queen, white_rook, white_pawn]
black_pieces_images = [black_bishop, black_king,
                       black_knight, black_queen, black_rook, black_pawn]

pieces = ['b', 'k', 'n', 'q', 'r', 'p']

DARK_SQUARE_COLOR = "#7C9EB3"
LIGHT_SQUARE_COLOR = "#D6E1E6"
SELECTED_SQUARE_COLOR = 'green'
LAST_MOVE_HIGHLIGHT = '#8CDBEA'


# 0 -> white turn
# 1 -> white turn with piece selected
# 2 -> black turn
# 3 -> black turn with piece selected
turn = 0
selected_piece = 99
valid_moves = []
captured_by_white = []
captured_by_black = []
last_move = []

# global white_can_passant
white_can_passant = False

# global black_can_passant
black_can_passant = False

black_pos_passant = (99, 99)
white_pos_passant = (99, 99)


def draw_table():
    # we are cool and only display the light squares
    for i in range(32):
        column = i % 4
        row = i // 4
        if row % 2 == 0:
            pygame.draw.rect(screen, LIGHT_SQUARE_COLOR,
                             (column * 200, row*100, 100, 100))
        else:
            pygame.draw.rect(screen, LIGHT_SQUARE_COLOR,
                             (column * 200 + 100, row*100, 100, 100))


def draw_pieces():
    PADDING = 5
    for i, white_piece in enumerate(white_pieces):
        existing_piece = pieces.index(white_piece)

        if i == selected_piece and turn < 2:
            pygame.draw.rect(screen, SELECTED_SQUARE_COLOR,
                             (white_positions[i][0] * 100 + 1, white_positions[i][1] * 100 + 1, 100, 100), 5)

        screen.blit(white_pieces_images[existing_piece],
                    (white_positions[i][0] * 100 + PADDING, white_positions[i][1] * 100 + PADDING))

    for i, black_piece in enumerate(black_pieces):
        existing_piece = pieces.index(black_piece)

        if i == selected_piece and turn >= 2:
            pygame.draw.rect(screen, 'red',
                             (black_positions[i][0] * 100 + 1, black_positions[i][1] * 100 + 1, 100, 100), 5)

        screen.blit(black_pieces_images[existing_piece],
                    (black_positions[i][0] * 100 + PADDING, black_positions[i][1] * 100 + PADDING))


# this function gets all the squares that a player can move /
# it sums all the available moves for the remain pieces
def get_options(pieces, positions, turn):
    piece_moves = []
    all_pieces_moves = []

    for piece, pos in zip(pieces, positions):
        if piece == 'p':
            piece_moves = get_pawn_moves(pos, turn)
        elif piece == 'r':
            piece_moves = get_rook_moves(pos, turn)
        elif piece == 'n':
            piece_moves = get_knight_moves(pos, turn)
        elif piece == 'b':
            piece_moves = get_bishop_moves(pos, turn)
        elif piece == 'q':
            piece_moves = get_queen_moves(pos, turn)
        elif piece == 'k':
            piece_moves = get_king_moves(pos, turn)

        all_pieces_moves.append(piece_moves)
    return all_pieces_moves


def get_king_moves(pos, turn):
    moves = []
    directions = [(0, -1), (1, -1), (1, 0), (1, 1),
                  (0, 1), (-1, 1), (-1, 0), (-1, -1)]

    if turn == 'white':
        friends = white_positions
        enemies = black_positions
    else:
        friends = black_positions
        enemies = white_positions

    for d in directions:
        x, y = pos
        x += d[0]
        y += d[1]

        if 0 <= x <= 7 and 0 <= y <= 7 and (x, y) not in friends:
            moves.append((x, y))

    return moves


def get_queen_moves(pos, turn):
    moves = []

    diagonal_moves = get_bishop_moves(pos, turn)
    line_moves = get_rook_moves(pos, turn)

    moves = [*diagonal_moves, *line_moves]

    return moves


def get_bishop_moves(pos, turn):
    moves = []
    directions = [(-1, -1), (1, -1), (1, 1), (-1, 1)]

    if turn == 'white':
        friends = white_positions
        enemies = black_positions
    else:
        friends = black_positions
        enemies = white_positions

    for d in directions:
        x, y = pos
        x += d[0]
        y += d[1]

        while 0 <= x <= 7 and 0 <= y <= 7 and (x, y) not in friends and (x, y) not in enemies:
            moves.append((x, y))
            x += d[0]
            y += d[1]
        if (x, y) in enemies:
            moves.append((x, y))

    return moves


def get_knight_moves(pos, turn):
    moves = []

    if turn == 'white':
        friends = white_positions
    else:
        friends = black_positions

    directions = [(1, -2), (1, 2), (-1, -2), (-1, 2),
                  (2, -1), (2, 1), (-2, -1), (-2, 1)]

    for d in directions:
        x, y = pos
        x += d[0]
        y += d[1]

        if 0 <= x <= 7 and 0 <= y <= 7 and (x, y) not in friends:
            moves.append((x, y))

    return moves


def get_rook_moves(pos, turn):
    moves = []

    # N, E, S, W
    directions = [(0, -1), (1, 0), (0, 1), (-1, 0)]

    if turn == 'white':
        friends = white_positions
        enemies = black_positions
    else:
        friends = black_positions
        enemies = white_positions

    for d in directions:
        x, y = pos
        x += d[0]
        y += d[1]

        while 0 <= x <= 7 and 0 <= y <= 7 and (x, y) not in friends and (x, y) not in enemies:
            moves.append((x, y))
            x += d[0]
            y += d[1]
        if (x, y) in enemies:
            moves.append((x, y))

    return moves


def get_pawn_moves(pos, turn):
    moves = []
    global white_can_passant
    global black_can_passant
    global white_pos_passant
    global black_pos_passant

    if turn == 'white':
        x, y = pos

        if (x, y - 1) not in white_positions and (x, y - 1) not in black_positions and y - 1 >= 0:
            moves.append((x, y - 1))

        if (x, y - 2) not in white_positions and (x, y - 2) not in black_positions and (x, y - 1) not in white_positions and (x, y - 1) not in black_positions and y == 6:
            moves.append((x, y - 2))
            black_can_passant = True
            # white_pos_passant = (x, y - 2)

        if (x + 1, y - 1) in black_positions:
            moves.append((x + 1, y - 1))

        if (x - 1, y - 1) in black_positions:
            moves.append((x - 1, y - 1))

        # en passant, the special move
        if white_can_passant:
            if black_pos_passant[0] == x + 1 and black_pos_passant[1] == y:
                moves.append((x + 1, y - 1))
            if black_pos_passant[0] == x - 1 and black_pos_passant[1] == y:
                moves.append((x - 1, y - 1))

    if turn == 'black':
        x, y = pos

        if (x, y + 1) not in white_positions and (x, y + 1) not in black_positions and y + 1 < 8:
            moves.append((x, y + 1))

        if (x, y + 2) not in white_positions and (x, y + 2) not in black_positions and (x, y + 1) not in white_positions and (x, y + 1) not in black_positions and y == 1:
            moves.append((x, y + 2))
            white_can_passant = True
            # black_pos_passant = (x, y + 2)

        if (x + 1, y + 1) in white_positions:
            moves.append((x + 1, y + 1))

        if (x - 1, y + 1) in white_positions:
            moves.append((x - 1, y + 1))

        # en passant, the special move
        if black_can_passant:
            if white_pos_passant[0] == x + 1 and white_pos_passant[1] == y:
                moves.append((x + 1, y + 1))
            if white_pos_passant[0] == x - 1 and white_pos_passant[1] == y:
                moves.append((x - 1, y + 1))

    return moves


def draw_valid_moves(moves):
    if turn < 2:
        color = 'green'
    else:
        color = 'red'

    for move in moves:
        pygame.draw.circle(
            screen, color, (move[0]*100 + 50, move[1]*100 + 50), 5)


# get the valid moves for the selected piece
def get_valid_moves():
    if turn < 2:
        options = white_options
    else:
        options = black_options

    valid_options = options[selected_piece]
    return valid_options


def highlight_last_move(last_move):
    for pos in last_move:
        pygame.draw.rect(screen, LAST_MOVE_HIGHLIGHT,
                         (pos[0] * 100 + 1, pos[1] * 100 + 1, 100, 100), 5)


white_options = get_options(white_pieces, white_positions, 'white')
black_options = get_options(black_pieces, black_positions, 'black')

isRunning = True
while isRunning:
    timer.tick(fps)
    screen.fill(DARK_SQUARE_COLOR)

    draw_table()
    draw_pieces()

    if selected_piece != 99:
        valid_moves = get_valid_moves()
        draw_valid_moves(valid_moves)

    if len(last_move) > 0:
        highlight_last_move(last_move)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            isRunning = False

        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
            x = event.pos[0] // 100
            y = event.pos[1] // 100

            if turn < 2:
                if (x, y) not in white_positions and (x, y) not in valid_moves:
                    selected_piece = 99

                if (x, y) in white_positions:
                    selected_piece = white_positions.index((x, y))
                    turn = 1 if turn == 0 else turn

                if (x, y) in valid_moves and selected_piece != 99:
                    if white_pieces[selected_piece] == 'p' and white_positions[selected_piece][0] == x and white_positions[selected_piece][1] - 2 == y:
                        black_can_passant = True
                        white_pos_passant = (x, y)

                    last_move = [(white_positions[selected_piece][0],
                                  white_positions[selected_piece][1]), (x, y)]

                    white_positions[selected_piece] = (x, y)

                    if (x, y) in black_positions:
                        black_piece_index = black_positions.index((x, y))
                        captured_by_white.append(
                            black_pieces[black_piece_index])
                        black_pieces.pop(black_piece_index)
                        black_positions.pop(black_piece_index)
                    elif white_can_passant and (x, y + 1) == black_pos_passant:
                        black_piece_index = black_positions.index((x, y + 1))
                        captured_by_white.append(
                            black_pieces[black_piece_index])
                        black_pieces.pop(black_piece_index)
                        black_positions.pop(black_piece_index)

                    white_options = get_options(
                        white_pieces, white_positions, 'white')
                    black_options = get_options(
                        black_pieces, black_positions, 'black')

                    turn = 2
                    selected_piece = 99
                    valid_moves = []
                    white_can_passant = False

            if turn >= 2:
                if (x, y) not in black_positions and (x, y) not in valid_moves:
                    selected_piece = 99

                if (x, y) in black_positions:
                    selected_piece = black_positions.index((x, y))
                    turn = 3 if turn == 2 else turn

                if (x, y) in valid_moves and selected_piece != 99:
                    if black_pieces[selected_piece] == 'p' and black_positions[selected_piece][0] == x and black_positions[selected_piece][1] + 2 == y:
                        white_can_passant = True
                        black_pos_passant = (x, y)

                    last_move = [(black_positions[selected_piece][0],
                                  black_positions[selected_piece][1]), (x, y)]

                    black_positions[selected_piece] = (x, y)

                    if (x, y) in white_positions:
                        white_piece_index = white_positions.index((x, y))
                        captured_by_black.append(
                            white_pieces[white_piece_index])
                        white_pieces.pop(white_piece_index)
                        white_positions.pop(white_piece_index)
                    elif black_can_passant and (x, y - 1) == white_pos_passant:
                        white_piece_index = white_positions.index((x, y - 1))
                        captured_by_black.append(
                            white_pieces[white_piece_index])
                        white_pieces.pop(white_piece_index)
                        white_positions.pop(white_piece_index)

                    white_options = get_options(
                        white_pieces, white_positions, 'white')
                    black_options = get_options(
                        black_pieces, black_positions, 'black')

                    turn = 0
                    selected_piece = 99
                    valid_moves = []
                    black_can_passant = False

    pygame.display.flip()
pygame.quit()
