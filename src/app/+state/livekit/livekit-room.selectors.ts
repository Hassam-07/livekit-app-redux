import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LiveKitRoomState } from './livekit-room.reducer';

// Feature selector
export const selectLiveKitRoomState =
  createFeatureSelector<LiveKitRoomState>('liveKitRoom');

// Specific property selectors
export const selectIsMeetingStarted = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => {
    console.log('Meeting started is ', state.isMeetingStarted);
    return state.isMeetingStarted;
  }
);

export const selectIsVideoOn = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => state.isVideoOn
);

export const selectParticipantSideWindowVisible = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => state.participantSideWindowVisible
);

export const selectChatSideWindowVisible = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => state.chatSideWindowVisible
);

export const selectIsScreenSharing = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => state.isScreenSharing
);

export const selectIconColor = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => state.iconColor
);

export const selectIsMicOn = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => {
    console.log('selector mic', state.isMicOn);
    return state.isMicOn;
  }
);

export const selectIsVideoLoading = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => state.isVideoLoading
);

export const selectIsMicLoading = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => state.isMicLoading
);

export const selectAllMessages = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => {
    console.log('msg is ', state.allMessages);
    return state.allMessages;
  }
);

export const selectUnreadMessagesCount = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => {
    console.log('selector unreads', state.unreadMessagesCount);
    return state.unreadMessagesCount;
  }
);

export const selectBreakoutSideWindowVisible = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => state.breakoutSideWindowVisible
);

export const isBreakoutModalOpen = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => {
    return state.isBreakoutModalOpen;
  }
);
export const isInvitationModalOpen = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => {
    return state.isInvitationModalOpen;
  }
);

export const isHostMsgModalOpen = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => {
    console.log('hello invitation', state.isHostMsgModalOpen);
    return state.isHostMsgModalOpen;
  }
);
export const selectDistributionMessage = createSelector(
  selectLiveKitRoomState,
  (state) => state.distributionMessage
);
export const selectBreakoutRoomsData = createSelector(
  selectLiveKitRoomState,
  (state) => {
    console.log('br from selector', state.breakoutRoomsData);
    return state.breakoutRoomsData;
  }
);
export const selectPreviewVideo = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => state.isPreviewVideoOn
);

export const selectPreviewMic = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => state.isPreviewMicOn
);

export const selectParticipantIdsByRoomName = createSelector(
  selectLiveKitRoomState,
  (state) => {
    console.log('breakoutRoomsData from selector:', state.breakoutRoomsData);

    const roomCount = state.breakoutRoomsData.length + 1;
    const newRoomName = `${state.roomName} Room ${roomCount}`;
    // Find the room by name and return its participantIds
    const room = state.breakoutRoomsData.find(
      (r) => r.roomName === newRoomName
    );
    const participantIds = room?.participantIds || [];

    console.log(`Participant IDs for room ${state.roomName}:`, participantIds);
    return participantIds;
  }
);

export const selectNextRoomIndex = createSelector(
  selectLiveKitRoomState,
  (state) => state.nextRoomIndex
);

export const selectHelpMessageModal = createSelector(
  selectLiveKitRoomState,
  (state) => {
    console.log('helpmessage ', state.helpMessageModal);
    return state.helpMessageModal;
  }
);
export const selectBreakoutRoomsLoading = createSelector(
  selectLiveKitRoomState,
  (state) => {
    console.log('loading rooms ', state.loading);
    return state.loading;
  }
);
export const selectGetRoomName = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => state.roomName
);

export const selectNotesSideWindowVisible = createSelector(
  selectLiveKitRoomState,
  (state: LiveKitRoomState) => state.notesSideWindowVisible
);

export const selectIsInitialScreenStarted = createSelector(
  selectLiveKitRoomState,
  (state) => {
    console.log('selector screen', state.isInitialScreenStarted);
    return state.isInitialScreenStarted;
  }
);

export const selectLiveKitRoomViewState = createSelector(
  selectIsMeetingStarted,
  selectIsVideoOn,
  selectParticipantSideWindowVisible,
  selectChatSideWindowVisible,
  selectIsScreenSharing,
  selectIconColor,
  selectIsMicOn,
  selectAllMessages,
  selectUnreadMessagesCount,
  selectBreakoutSideWindowVisible,
  isBreakoutModalOpen,
  isInvitationModalOpen,
  isHostMsgModalOpen,
  selectDistributionMessage,
  selectBreakoutRoomsData,
  selectNextRoomIndex,
  selectHelpMessageModal,
  selectBreakoutRoomsLoading,
  selectGetRoomName,
  selectIsVideoLoading,
  selectIsMicLoading,
  selectParticipantIdsByRoomName,
  selectPreviewVideo,
  selectPreviewMic,
  selectNotesSideWindowVisible,
  selectIsInitialScreenStarted,
  (
    isMeetingStarted,
    isVideoOn,
    participantSideWindowVisible,
    chatSideWindowVisible,
    isScreenSharing,
    iconColor,
    isMicOn,
    allMessages,
    unreadMessagesCount,
    breakoutSideWindowVisible,
    isBreakoutModalOpen,
    isInvitationModalOpen,
    isHostMsgModalOpen,
    distributionMessage,
    breakoutRoomsData,
    nextRoomIndex,
    helpMessageModal,
    breakoutRoomsLoading,
    getRoomName,
    isVideoLoading,
    isMicLoading,
    ParticipantIdsByRoomName,
    previewVideo,
    previewMic,
    notesSideWindowVisible,
    isInitialScreenStarted
  ) => ({
    isMeetingStarted,
    isVideoOn,
    participantSideWindowVisible,
    chatSideWindowVisible,
    isScreenSharing,
    iconColor,
    isMicOn,
    allMessages,
    unreadMessagesCount,
    breakoutSideWindowVisible,
    isBreakoutModalOpen,
    isInvitationModalOpen,
    isHostMsgModalOpen,
    distributionMessage,
    breakoutRoomsData,
    nextRoomIndex,
    helpMessageModal,
    breakoutRoomsLoading,
    getRoomName,
    isVideoLoading,
    isMicLoading,
    ParticipantIdsByRoomName,
    previewVideo,
    previewMic,
    notesSideWindowVisible,
    isInitialScreenStarted,
  })
);
