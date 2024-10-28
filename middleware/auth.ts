export default function authMiddleware() {
  const user = useSupabaseUser();
  const router = useRouter();

  if (!user.value) {
    router.push('/login');
  }
}