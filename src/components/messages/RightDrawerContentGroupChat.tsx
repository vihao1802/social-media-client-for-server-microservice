import { Avatar, Box, Button, Divider, IconButton } from '@mui/material';
import { Add, LogoutRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import RightModalImageContentMessages from './RightModalImageContentMessages';
import GradientCircularProgress from '../shared/Loader';
import { useRouter } from 'next/navigation';
import { useGetGroupChatById } from '@/hooks/chat-group/useGetGroupChatById';
import { useGetMessagesByGroupId } from '@/hooks/chat-group-message/useGetMessagesByGroupId';
import { chatGroupMemberApi } from '@/api/chat-group-member';
import useSWR from 'swr';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import RightModalAddMembers from './RightModalAddMembers';

const RightDrawerContentGroupChat = ({
  closeDrawer,
  g_id,
}: {
  closeDrawer: () => void;
  g_id: string;
}) => {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openModalAddMember, setOpenModalAddMember] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);
  const toggleModalAddMember = () => setOpenModalAddMember(!openModalAddMember);
  const { data: groupChat } = useGetGroupChatById({ groupId: g_id });
  const { data: messagesRes } = useGetMessagesByGroupId({ groupId: g_id });
  const { user: authUser } = useAuthenticatedUser();
  const { data: membersRes } = useSWR(
    'get_members_by_group_id',
    async () => await chatGroupMemberApi.getMembersByGroupId(g_id)
  );

  if (!groupChat)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <GradientCircularProgress />
      </Box>
    );

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }} role="presentation">
      <IconButton
        sx={{
          position: 'absolute',
          color: 'black',
          margin: '15px',
          padding: '0',
        }}
        onClick={closeDrawer}
      >
        <LogoutRounded
          fontSize="large"
          sx={{
            color: 'gray',
            ':hover': {
              color: 'black',
            },
            transition: '0.2s ease',
          }}
        />
      </IconButton>
      <RightModalImageContentMessages
        imgSrc={imgSrc}
        openModal={openModal}
        toggleModal={toggleModal}
      />
      <RightModalAddMembers
        groupChatId={g_id}
        openModal={openModalAddMember}
        toggleModal={toggleModalAddMember}
      />

      <Box
        sx={{
          height: '100vh',
          padding: '15px 0 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar
          src={groupChat.avatar || '/icons/user.png'}
          sx={{
            width: '100px',
            height: '100px',
            border: '4px solid #e0e0e0',
          }}
        />
        <p className="text-xl font-bold">{groupChat.name}</p>
        <Box
          sx={{
            borderTop: '1px solid #e0e0e0',
            width: '100%',
            flex: 1,
          }}
        >
          <Box
            sx={{
              // height: "calc(100vh - 290px)",
              overflowY: 'auto',
              '::-webkit-scrollbar': { width: '10px' },
              '::-webkit-scrollbar-track': {
                background: '#f1f1f1',
              },
              '::-webkit-scrollbar-thumb': {
                background: '#858585',
              },
              '::-webkit-scrollbar-thumb:hover': {
                background: '#777',
              },
            }}
          >
            <p className="text-xl font-semibold text-left my-4 mx-[25px]">
              Members
            </p>
            {authUser && groupChat.adminId === authUser.id && (
              <Button
                onClick={toggleModalAddMember}
                sx={{
                  marginLeft: '20px',
                  marginBottom: '10px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'black',
                  width: 'calc(100% - 40px)',
                  backgroundColor: '#e7e7e7',
                  ':hover': {
                    backgroundColor: '#d7d7d7',
                  },
                  textTransform: 'none',
                }}
                startIcon={<Add />}
              >
                Add
              </Button>
            )}
            {!membersRes || membersRes === undefined ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <GradientCircularProgress />
              </Box>
            ) : (
              <Box>
                {membersRes.items.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 25px 15px',
                    }}
                  >
                    <img
                      alt="Avatar"
                      src={item.user.profile_img}
                      className="w-10 h-10 rounded-full"
                    />
                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        marginLeft: '10px',
                        textAlign: 'left',
                      }}
                    >
                      <p className="font-semibold">
                        {item.user.username}{' '}
                        {groupChat.adminId === item.user.id && '(Admin)'}
                      </p>
                      <p className="font-thin text-sm text-gray-400">
                        {item.user.email}
                      </p>
                    </Box>
                    <Button
                      onClick={() => router.push(`/profile/${item.user.id}`)}
                      sx={{
                        textTransform: 'none',
                        ':hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      View
                    </Button>
                  </Box>
                ))}
              </Box>
            )}

            <p className="text-xl font-semibold text-center my-4 pt-2 border-t-2 border-[#e0e0e0]">
              Photos
            </p>

            {!messagesRes || messagesRes === undefined ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '375px',
                  gridColumnStart: 1,
                  gridColumnEnd: 4,
                }}
              >
                <GradientCircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  paddingBottom: '20px',
                }}
              >
                {messagesRes.items.length === 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '375px',
                      gridColumnStart: 1,
                      gridColumnEnd: 4,
                      color: 'GrayText',
                    }}
                  >
                    <p className="text-lg">No photos</p>
                  </Box>
                )}
                {messagesRes.items.map((item, index) => {
                  if (item.media_content.length === 0) return null;
                  return (
                    <Box
                      key={index}
                      onClick={() => {
                        toggleModal();
                        setImgSrc(item.media_content);
                      }}
                    >
                      <img
                        alt="image"
                        src={item.media_content}
                        className="object-cover w-[125px] h-[125px] cursor-pointer hover:opacity-85"
                      />
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RightDrawerContentGroupChat;
