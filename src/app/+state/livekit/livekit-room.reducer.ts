import { createReducer, on } from '@ngrx/store';
import * as LiveKitRoomActions from './livekit-room.actions';

export interface BreakoutRoom {
  roomName: string;
  participantIds: string[];
  showAvailableParticipants: boolean;
}
export interface LiveKitRoomState {
  isMeetingStarted: boolean;
  allMessages: any[];
  unreadMessagesCount: number;
  isVideoOn: boolean;
  isMicOn: boolean;
  isVideoLoading: boolean;
  isMicLoading: boolean;
  isScreenSharing: boolean;
  iconColor: string;
  participantSideWindowVisible: boolean;
  breakoutSideWindowVisible: boolean;
  chatSideWindowVisible: boolean;
  error?: string;
  token: string | null;
  isBreakoutModalOpen: boolean;
  isInvitationModalOpen: boolean;
  isHostMsgModalOpen: boolean;
  roomType: string;
  selectedParticipants: string[];
  numberOfRooms: number | null;
  distributionMessage: string;
  breakoutRoomsData: BreakoutRoom[];
  nextRoomIndex: number;
  helpMessageModal: boolean;
  loading: boolean;
  roomName: string;
  isPreviewMicOn: boolean;
  isPreviewVideoOn: boolean;
  notesSideWindowVisible: boolean;
  isInitialScreenStarted: boolean;
}

export const initialState: LiveKitRoomState = {
  isMeetingStarted: false,
  allMessages: [],
  unreadMessagesCount: 0,
  isVideoOn: false,
  isMicOn: false,
  isVideoLoading: false,
  isMicLoading: false,
  isScreenSharing: false,
  iconColor: 'black',
  participantSideWindowVisible: false,
  breakoutSideWindowVisible: false,
  chatSideWindowVisible: false,
  token: null,
  isBreakoutModalOpen: false,
  isInvitationModalOpen: false,
  isHostMsgModalOpen: false,
  roomType: '',
  selectedParticipants: [],
  numberOfRooms: null,
  distributionMessage: '',
  breakoutRoomsData: [],
  nextRoomIndex: 1,
  helpMessageModal: false,
  loading: false,
  roomName: '',
  isPreviewMicOn: false,
  isPreviewVideoOn: false,
  notesSideWindowVisible: false,
  isInitialScreenStarted: false,
};

export const liveKitRoomReducer = createReducer(
  initialState,
  on(LiveKitRoomActions.MeetingActions.setRoomName, (state, { roomName }) => ({
    ...state,
    roomName: roomName,
  })),
  on(
    LiveKitRoomActions.MeetingActions.createMeetingSuccess,
    (state, { token }) => ({
      ...state,
      token,
    })
  ),
  on(
    LiveKitRoomActions.MeetingActions.createMeetingFailure,
    (state, { error }) => ({
      ...state,
      token: null,
      error,
    })
  ),
  on(LiveKitRoomActions.LiveKitActions.startMeetingSuccess, (state) => ({
    ...state,
    isMeetingStarted: true,
    isVideoOn: false,
  })),
  on(
    LiveKitRoomActions.LiveKitActions.startMeetingFailure,
    (state, { error }) => ({
      ...state,
      isMeetingStarted: false,
      error,
    })
  ),
  on(
    LiveKitRoomActions.LiveKitActions.enableCameraAndMicrophoneSuccess,
    (state) => ({
      ...state,
    })
  ),
  on(
    LiveKitRoomActions.LiveKitActions.enableCameraAndMicrophoneFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  ),
  on(
    LiveKitRoomActions.LiveKitActions.toggleScreenShareSuccess,
    (state, { isScreenSharing }) => {
      console.log('Reducer: Screen Sharing Success', isScreenSharing);
      return {
        ...state,
        isScreenSharing,
        iconColor: isScreenSharing ? 'green' : 'black',
      };
    }
  ),
  on(
    LiveKitRoomActions.LiveKitActions.toggleScreenShareFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  ),
  on(
    LiveKitRoomActions.LiveKitActions.setVideoLoading,
    (state, { isLoading }) => ({
      ...state,
      isVideoLoading: isLoading,
    })
  ),
  on(
    LiveKitRoomActions.LiveKitActions.setMicLoading,
    (state, { isLoading }) => ({
      ...state,
      isMicLoading: isLoading,
    })
  ),
  on(
    LiveKitRoomActions.LiveKitActions.toggleVideoSuccess,
    (state, { isVideoOn }) => ({
      ...state,

      isVideoOn,
      isVideoLoading: false,
    })
  ),
  on(
    LiveKitRoomActions.LiveKitActions.toggleVideoFailure,
    (state, { error }) => ({
      ...state,
      error,
      isVideoLoading: false,
    })
  ),
  on(
    LiveKitRoomActions.LiveKitActions.toggleMicSuccess,
    (state, { isMicOn }) => {
      console.log('Mic status in reducer (toggleMicSuccess):', isMicOn); // Debug
      return {
        ...state,
        isMicOn,
        isMicLoading: false,
      };
    }
  ),
  on(
    LiveKitRoomActions.LiveKitActions.toggleMicFailure,
    (state, { error }) => ({
      ...state,
      error,
      isMicLoading: false,
    })
  ),

  on(LiveKitRoomActions.LiveKitActions.closeChatSideWindow, (state) => ({
    ...state,
    chatSideWindowVisible: false,
    unreadMessagesCount: 0,
  })),
  on(LiveKitRoomActions.LiveKitActions.closeNotesSideWindow, (state) => ({
    ...state,
    notesSideWindowVisible: false,
  })),
  on(LiveKitRoomActions.LiveKitActions.closeParticipantSideWindow, (state) => ({
    ...state,
    participantSideWindowVisible: false,
  })),

  on(
    LiveKitRoomActions.LiveKitActions.toggleParticipantSideWindow,
    (state) => ({
      ...state,
      participantSideWindowVisible: !state.participantSideWindowVisible,
      chatSideWindowVisible:
        state.chatSideWindowVisible && !state.participantSideWindowVisible
          ? false
          : state.chatSideWindowVisible,
      breakoutSideWindowVisible:
        state.breakoutSideWindowVisible && !state.participantSideWindowVisible
          ? false
          : state.breakoutSideWindowVisible,
      notesSideWindowVisible:
        state.notesSideWindowVisible && !state.participantSideWindowVisible
          ? false
          : state.notesSideWindowVisible,
    })
  ),

  on(LiveKitRoomActions.LiveKitActions.toggleChatSideWindow, (state) => ({
    ...state,
    chatSideWindowVisible: !state.chatSideWindowVisible,
    unreadMessagesCount:
      !state.chatSideWindowVisible === false ? 0 : state.unreadMessagesCount,
    participantSideWindowVisible:
      state.participantSideWindowVisible && !state.chatSideWindowVisible
        ? false
        : state.participantSideWindowVisible,
    breakoutSideWindowVisible:
      state.breakoutSideWindowVisible && !state.chatSideWindowVisible
        ? false
        : state.breakoutSideWindowVisible,
    notesSideWindowVisible:
      state.notesSideWindowVisible && !state.chatSideWindowVisible
        ? false
        : state.notesSideWindowVisible,
  })),
  on(LiveKitRoomActions.LiveKitActions.toggleNotesSideWindow, (state) => ({
    ...state,
    notesSideWindowVisible: !state.notesSideWindowVisible,
    chatSideWindowVisible:
      state.chatSideWindowVisible && !state.notesSideWindowVisible
        ? false
        : state.chatSideWindowVisible,
    participantSideWindowVisible:
      state.participantSideWindowVisible && !state.notesSideWindowVisible
        ? false
        : state.participantSideWindowVisible,
    breakoutSideWindowVisible:
      state.breakoutSideWindowVisible && !state.notesSideWindowVisible
        ? false
        : state.breakoutSideWindowVisible,
  })),

  on(
    LiveKitRoomActions.LiveKitActions.updateUnreadMessagesCount,
    (state, { count }) => ({
      ...state,
      unreadMessagesCount: count,
    })
  ),
  on(LiveKitRoomActions.LiveKitActions.resetUnreadMessagesCount, (state) => ({
    ...state,
    unreadMessagesCount: 0,
  })),
  on(
    LiveKitRoomActions.LiveKitActions.updateMessages,
    (state, { allMessages }) => ({
      ...state,
      allMessages,
    })
  ),
  on(
    LiveKitRoomActions.ChatActions.receiveMessage,
    (state, { message, participant }) => {
      const receivedMsg = message?.message;
      const senderName = participant?.identity;
      const receivingTime = message?.timestamp;
      const newMessages = [
        ...state.allMessages,
        {
          senderName,
          receivedMsg,
          receivingTime,
          type: 'received',
        },
      ];
      return {
        ...state,
        allMessages: newMessages,
        unreadMessagesCount: state.chatSideWindowVisible
          ? state.unreadMessagesCount
          : state.unreadMessagesCount + 1,
      };
    }
  ),
  on(
    LiveKitRoomActions.ChatActions.sendMessage,
    (state, { message, recipient }) => {
      const sendingTime = new Date();
      return {
        ...state,
        allMessages: [
          ...state.allMessages,
          { sendMessage: message, recipient, sendingTime, type: 'sent' },
        ],
      };
    }
  ),
  on(LiveKitRoomActions.MeetingActions.leaveMeetingSuccess, (state) => ({
    ...state,
    isMeetingStarted: false,
  })),
  on(
    LiveKitRoomActions.MeetingActions.leaveMeetingFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  ),
  on(LiveKitRoomActions.BreakoutActions.toggleBreakoutSideWindow, (state) => ({
    ...state,
    breakoutSideWindowVisible: !state.breakoutSideWindowVisible,
    chatSideWindowVisible:
      state.chatSideWindowVisible && !state.breakoutSideWindowVisible
        ? false
        : state.chatSideWindowVisible,
    participantSideWindowVisible:
      state.participantSideWindowVisible && !state.breakoutSideWindowVisible
        ? false
        : state.participantSideWindowVisible,
    notesSideWindowVisible:
      state.notesSideWindowVisible && !state.breakoutSideWindowVisible
        ? false
        : state.notesSideWindowVisible,
  })),
  on(LiveKitRoomActions.BreakoutActions.closeBreakoutSideWindow, (state) => ({
    ...state,
    breakoutSideWindowVisible: false,
  })),
  on(LiveKitRoomActions.BreakoutActions.openBreakoutModal, (state) => ({
    ...state,
    isBreakoutModalOpen: true,
  })),
  on(LiveKitRoomActions.BreakoutActions.closeBreakoutModal, (state) => ({
    ...state,
    isBreakoutModalOpen: false,
  })),
  // invitation modal sent to participant to join breakout room
  on(LiveKitRoomActions.BreakoutActions.openInvitationModal, (state) => ({
    ...state,
    isInvitationModalOpen: true,
  })),
  on(LiveKitRoomActions.BreakoutActions.closeInvitationModal, (state) => ({
    ...state,
    isInvitationModalOpen: false,
  })),
  // Message modal sent to breakout room from host
  on(LiveKitRoomActions.BreakoutActions.openHostToBrMsgModal, (state) => ({
    ...state,
    isHostMsgModalOpen: true,
  })),
  on(LiveKitRoomActions.BreakoutActions.closeHostToBrMsgModal, (state) => ({
    ...state,
    isHostMsgModalOpen: false,
  })),
  on(LiveKitRoomActions.BreakoutActions.openHelpMessageModal, (state) => ({
    ...state,
    helpMessageModal: true,
  })),
  on(LiveKitRoomActions.BreakoutActions.closeHelpMessageModal, (state) => ({
    ...state,
    helpMessageModal: false,
  })),
  // breakout modal distribution in automatic room selection
  on(
    LiveKitRoomActions.BreakoutActions.calculateDistribution,
    (state, { numberOfRooms, totalParticipants }) => {
      let message = '';

      if (numberOfRooms > 0 && totalParticipants > 0) {
        const participantsPerRoom = Math.floor(
          totalParticipants / numberOfRooms
        );
        const remainder = totalParticipants % numberOfRooms;

        if (remainder > 0) {
          message = `${remainder} room(s) will have ${
            participantsPerRoom + 1
          } participants. `;
          message += `${
            numberOfRooms - remainder
          } room(s) will have ${participantsPerRoom} participants.`;
        } else {
          message = `${numberOfRooms} room(s), each will have ${participantsPerRoom} participants.`;
        }
      } else {
        message = 'Please enter valid number of rooms and participants.';
      }

      return { ...state, distributionMessage: message };
    }
  ),
  on(
    LiveKitRoomActions.BreakoutActions.calculateDistributionSuccess,
    (state, { distributionMessage }) => ({
      ...state,
      distributionMessage,
    })
  ),
  //creating new rooms
  on(
    LiveKitRoomActions.BreakoutActions.createNewRoomSuccess,
    (state, { newRoom }) => ({
      ...state,
      breakoutRoomsData: [
        ...state.breakoutRoomsData,
        {
          ...newRoom, // Include properties from the newRoom payload
          roomName: `${state.roomName} Room ${
            state.breakoutRoomsData.length + 1
          }`, // Dynamically set the roomName
          participantIds: newRoom.participantIds || [], // Use participantIds from newRoom or default to an empty array
          showAvailableParticipants: newRoom.showAvailableParticipants ?? false, // Use existing or default value
        },
      ],
    })
  ),
  on(
    LiveKitRoomActions.BreakoutActions.addParticipantToRoom,
    (state, { roomName, participantId }) => ({
      ...state,
      breakoutRoomsData: state.breakoutRoomsData.map((room) =>
        room.roomName === roomName
          ? {
              ...room,
              participantIds: [...room.participantIds, participantId],
            }
          : room
      ),
    })
  ),
  on(
    LiveKitRoomActions.BreakoutActions.toggleParticipantsList,
    (state, { index }) => {
      const rooms = state.breakoutRoomsData.map((room, idx) => {
        if (idx === index) {
          return {
            ...room,
            showAvailableParticipants: !room.showAvailableParticipants,
          };
        }
        return room;
      });
      return { ...state, breakoutRoomsData: rooms };
    }
  ),
  on(
    LiveKitRoomActions.BreakoutActions.removeParticipant,
    (state, { roomName, participantId }) => {
      const rooms = state.breakoutRoomsData.map((room) => {
        if (room.roomName === roomName) {
          return {
            ...room,
            participantIds: room.participantIds.filter(
              (id) => id !== participantId
            ),
          };
        }
        return room;
      });
      return { ...state, breakoutRoomsData: rooms };
    }
  ),
  on(LiveKitRoomActions.BreakoutActions.loadBreakoutRooms, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    LiveKitRoomActions.BreakoutActions.loadBreakoutRoomsSuccess,
    (state, { breakoutRoomsData }) => ({
      ...state,
      breakoutRoomsData,
      loading: false,
    })
  ),
  on(
    LiveKitRoomActions.BreakoutActions.loadBreakoutRoomsFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  ),
  on(
    LiveKitRoomActions.LiveKitActions.previewCameraEnable,
    (state, { isPreviewVideo }) => ({
      ...state,
      isPreviewVideoOn: isPreviewVideo,
    })
  ),
  on(
    LiveKitRoomActions.LiveKitActions.previewMicEnable,
    (state, { isPreviewMic }) => ({
      ...state,
      isPreviewMicOn: isPreviewMic,
    })
  ),
  on(
    LiveKitRoomActions.MeetingActions.setInitialScreenStarted,
    (state, { started }) => ({
      ...state,
      isInitialScreenStarted: started,
    })
  )
);
