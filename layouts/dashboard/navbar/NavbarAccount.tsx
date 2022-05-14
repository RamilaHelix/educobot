// next
import NextLink from "next/link";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Link, Typography } from "@mui/material";
// hooks
import useAuth from "../../../hooks/useAuth";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import MyAvatar from "../../../components/MyAvatar";
import { useState } from "react";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

type Props = {
  isCollapse: boolean | undefined;
};

export default function NavbarAccount({ isCollapse }: Props) {
  const { user } = useAuth();
  // const [user] = useState({
  //   displayName: 'Ramila',
  //   role: 'student',
  // });

  return (
    // <NextLink href={PATH_DASHBOARD.user.account} passHref>
    <NextLink href={PATH_DASHBOARD.general.profile} passHref>
      <Link underline="none" color="inherit">
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: "transparent",
            }),
          }}
        >
          <MyAvatar />
          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              {user?.displayName}
            </Typography>
            <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
              {user?.role()}
            </Typography>
          </Box>
        </RootStyle>
      </Link>
    </NextLink>
  );
}
