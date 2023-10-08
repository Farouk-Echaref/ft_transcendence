import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { MatchesService } from './matches.service';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { ActiveUserData } from '@src/iam/interface/active-user-data.interface';
import { WsAuthGuard } from '@src/iam/authentication/guards/ws-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GamePlayService } from '../gameplay/gameplay.service';
import { MatchesStorage } from './matches.storage';

@WebSocketGateway()
export class MatchesGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;
  gamePlay!: GamePlayService;

  constructor(
    private matchesService: MatchesService,
    private matchesStorage: MatchesStorage,
  ) {
    matchesStorage.setServer(this.server);
  }

  handleDisconnect(client: any) {
    this.matchesStorage.removePlayer(client);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('joinMatch')
  async joinMatch(
    @ConnectedSocket() client: Socket,
    @MessageBody('matchId') matchId: number,
  ) {
    const user: ActiveUserData = client.data.user;
    const match = await this.matchesService.findOneById(matchId);
    if (!match) throw new WsException('Match Not Found!');
    if (match.winnerId !== null) throw new WsException('Match is Over!');

    this.matchesStorage.connectPlayer(match, user.sub, client);
    const roomId = getMatchRoomId(matchId);
    this.server.to(roomId).emit('startGame', this.matchesStorage[matchId]);
  }
}
