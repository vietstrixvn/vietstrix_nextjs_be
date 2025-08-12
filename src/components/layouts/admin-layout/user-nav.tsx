'use client';
import { ComponentsIcons } from '@/assets/icons/icons';
import { CustomImage } from '@/components/design/image.component';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@radix-ui/react-avatar';
import { useRouter } from 'next/navigation';

export function UserNav({
  user,
  logout,
}: {
  user: {
    name: string;
    email: string;
  } | null;
  logout: () => void;
}) {
  const router = useRouter();
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 bg-white rounded-full"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <CustomImage
                src="/icons/logo.svg"
                alt="vietsitrx"
                width={32}
                height={32}
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          align="end"
          sideOffset={10}
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">{user?.name}</p>
              <p className="text-muted-foreground text-xs leading-none">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/admin/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Change Password</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <ComponentsIcons.LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
