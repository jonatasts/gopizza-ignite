import { Container, Title, Notification, Quantity } from "./styles";
import { BottomMenuProps } from "./types";

export const BottomMenu = ({
  title,
  color,
  notifications,
}: BottomMenuProps) => {
  const noNotifications = notifications === "0";

  return (
    <Container>
      <Title color={color}>{title}</Title>

      {notifications && (
        <Notification noNotifications={noNotifications}>
          <Quantity noNotifications={noNotifications}>{notifications}</Quantity>
        </Notification>
      )}
    </Container>
  );
};

export default BottomMenu;
