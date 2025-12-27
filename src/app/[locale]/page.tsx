import { getTranslations } from 'next-intl/server';
import ThemeToggleButton from '../../components/ThemeToggleButton';
import LanguageDropdown from '../../components/languageDropdown';

export default async function Page() {
  const t = await getTranslations();
  return (
    <main className="p-6">
      <div className="m-5">
        <ThemeToggleButton />
      </div>
      <div className="m-5">
        <LanguageDropdown />
      </div>
      <h1 className="text-2xl font-semibold">{t('welcomeTxt')}</h1>
      <p className="mt-3 opacity-80">{t('summary.intro')}</p>
    </main>
  );
}
