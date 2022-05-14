import { useEffect, useState } from "react";
// next
import { useRouter } from "next/router";
// @mui
import { styled, useTheme } from "@mui/material/styles";
import { Box, Stack, Drawer } from "@mui/material";
// hooks
import useResponsive from "../../../hooks/useResponsive";
import useCollapseDrawer from "../../../hooks/useCollapseDrawer";
// utils
import cssStyles from "../../../utils/cssStyles";
// config
import { NAVBAR } from "../../../config";

// components
import Logo from "../../../components/Logo";
import Scrollbar from "../../../components/Scrollbar";
import { NavSectionVertical } from "../../../components/nav-section";
//
import navConfig, {
  studentConfig,
  teacherConfig,
  schoolAdminConfig,
  superAdminConfig,
} from "./NavConfig";
import NavbarDocs from "./NavbarDocs";
import NavbarAccount from "./NavbarAccount";
import CollapseButton from "./CollapseButton";
import useAuth from "../../../hooks/useAuth";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function NavbarVertical({
  isOpenSidebar,
  onCloseSidebar,
}: Props) {
  const theme = useTheme();

  const { user } = useAuth();

  const { pathname } = useRouter();

  const isDesktop = useResponsive("up", "lg");

  const [whichNavBar, setNavBar] = useState(navConfig);

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const role = user?.email;
    if (role === "anurag.av@helixsta.in") {
      setNavBar(studentConfig);
    } else if (role === "anurag.av@helixstack.in") {
      setNavBar(teacherConfig);
    } else if (role === "schooladmin@gmail.com") {
      setNavBar(schoolAdminConfig);
    } else if (role === "superadmin@gmail.com") {
      setNavBar(superAdminConfig);
    } else {
      setNavBar(navConfig);
    }
  }, [whichNavBar]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: "center" }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* needs to be small when collapse */}
          <Logo />
          {isDesktop && !isCollapse && (
            <CollapseButton
              onToggleCollapse={onToggleCollapse}
              collapseClick={collapseClick}
            />
          )}
        </Stack>
        <NavbarAccount isCollapse={isCollapse} />
      </Stack>

      <NavSectionVertical navConfig={whichNavBar} isCollapse={isCollapse} />

      <Box sx={{ flexGrow: 1 }} />

      {!isCollapse && <NavbarDocs />}
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse
            ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
            : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: "absolute",
        }),
      }}
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: "dashed",
              bgcolor: "background.default",
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}