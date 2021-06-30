const AuthReducer = (state, action) => {
  if (action.type === "LOGIN_START") {
    return { user: null, isfetching: true, error: false };
  }
  if (action.type === "LOGIN_SUCCESS") {
    return { user: action.payload, isfetching: false, error: false };
  }
  if (action.type === "LOGIN_FAILER") {
    return { user: null, isfetching: false, error: action.payload };
  }
  if (action.type === "REGISTER_START") {
    return { ...state, isfetching: true };
  }
  if (action.type === "REGISTER_SUCCESS") {
    return { ...state, isfetching: false, user: action.payload };
  }
  if (action.type === "REGISTER_FAILER") {
    return { user: null, isfetching: false, error: action.payload };
  }
  if (action.type === "LOG_OUT") {
    return { user: null, isfetching: false, error: null };
  }
  if (action.type === "FOLLOW_USER") {
    return {
      ...state,
      user: {
        ...state.user,
        followings: [...state.user.followings, action.payload],
      },
    };
  }
  if (action.type === "UNFOLLOW_USER") {
    const newFollowings = state.user.followings.filter(
      (friendId) => friendId !== action.payload
    );
    return { ...state, user: { ...state.user, followings: newFollowings } };
  }
  if (action.type === "CHANGE_PROFILE_PIC") {
    return {
      ...state,
      user: { ...state.user, profilePicture: action.payload },
    };
  }
  if (action.type === "CHANGE_COVER_PIC") {
    return {
      ...state,
      user: { ...state.user, coverPicture: action.payload },
    };
  }
  throw new Error("Action type doesn't match");
};

export default AuthReducer;
