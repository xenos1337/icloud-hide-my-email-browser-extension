import {
  faCheckCircle,
  faInfoCircle,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { InputHTMLAttributes, useState } from 'react';
import { isFirefox } from '../../browserUtils';
import { Link, TitledComponent } from '../../commonComponents';

const Notice = (props: {
  title: string;
  children: React.ReactNode;
  isAlert?: boolean;
}) => {
  const { title, children, isAlert = false } = props;

  const colourPalette = isAlert
    ? 'bg-yellow-50 dark:bg-yellow-900/50 border-yellow-400 text-yellow-600 dark:text-yellow-200'
    : 'text-text-light dark:text-text-dark bg-surface-light dark:bg-surface-dark border-gray-200 dark:border-gray-600';

  return (
    <div
      className={`flex p-3 text-sm border rounded-lg ${colourPalette}`}
      role={isAlert ? 'alert' : 'info'}
    >
      <FontAwesomeIcon
        icon={isAlert ? faWarning : faInfoCircle}
        className="mr-2 mt-1"
      />
      <span className="sr-only">Info</span>
      <div className="space-y-1">
        <p className="font-semibold">{title}</p>
        {children}
      </div>
    </div>
  );
};

const SignInInstructions = () => {
  return (
    <div className="space-y-4">
      <div>
        <p>
          To setup this extension, you need to sign-in to your iCloud account
          from within the browser. Navigate to{' '}
          <Link
            href="https://icloud.com"
            className="font-semibold"
            aria-label="Go to iCloud.com"
          >
            icloud.com
          </Link>{' '}
          and complete the full sign-in process, including the{' '}
          <span className="font-semibold">two-factor authentication</span> and{' '}
          <span className="font-semibold">Trust This Browser</span> steps.
        </p>
        <div className="text-center">
          <img
            src="./icloud-sign-in.webp"
            alt="Screenshots of the icloud.com sign-in flow"
          />
        </div>
        <p>
          Once you&apos;re signed-in to your account you&apos;re set to go. Open
          the extension pop-up (🍏 icon) to generate a new{' '}
          <span className="font-semibold">HideMyEmail</span> address! ✨
        </p>
      </div>
      {isFirefox && (
        <Notice title="Using Firefox Multi-Account Containers?" isAlert>
          <p>
            The extension won&apos;t work if you log-in to icloud.com from a tab
            within a container. Instead, you need to log-in from a{' '}
            <i>default</i> tab that is not part of any container. Once logged
            in, the extension will work in any tab, whether it&apos;s part of a
            container or not.
          </p>
        </Notice>
      )}
      <Notice title="Already signed-in?">
        <p>No further action needed. The extension is ready to use!</p>
      </Notice>
      <Notice title='Do I have to ✅ the "Keep me signed in" box?'>
        <p>
          This is not necessary. You may also choose to not trust this browser
          in the relevant step of the sign-in flow. The extension will work
          regardless. However, by opting to remain signed in, you ensure that
          the extension will also remain signed in, which will save you from
          frequently repeating the sign-in process. Hence, even though not
          necessary,{' '}
          <span className="font-semibold">
            it&apos;s strongly recommended to tick the &quot;Keep me signed
            in&quot; box
          </span>
          .
        </p>
      </Notice>
    </div>
  );
};

const AutofillableDemoInput = (props: {
  inputAttributes: InputHTMLAttributes<HTMLInputElement>;
  label: string;
}) => {
  const [autofillableInputValue, setAutoFillableInputValue] =
    useState<string>();

  return (
    <div className="space-y-2">
      <label
        htmlFor={props.inputAttributes.id}
        className="block font-semibold text-text-light dark:text-text-dark"
      >
        {props.label}{' '}
        {autofillableInputValue?.endsWith('@icloud.com') && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="ml-1 mt-1 text-green-500"
          />
        )}
      </label>
      <input
        className="block w-full rounded-md relative px-3 py-2 border border-gray-200 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark focus:outline-none focus:ring-sky-400 focus:border-sky-400 focus:z-10 sm:text-sm"
        defaultValue={autofillableInputValue}
        onInput={(e) =>
          setAutoFillableInputValue((e.target as HTMLInputElement).value)
        }
        {...props.inputAttributes}
      />
    </div>
  );
};

const UsageInstructions = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p>
          In the extension pop-up (🍏 icon) you can find a
          MacOS-System-Settings-like UI that enables you to generate new
          HideMyEmail addresses and manage existing ones.
        </p>
        <p>
          <span className="font-semibold">
            In most cases though, you don&apos;t need to interact with the
            pop-up UI
          </span>
          . The extension will automatically detect email input fields and
          prompt you to autofill new addresses! Alternatively, you can
          right-click on any text input field and select the menu item of the
          extension.
        </p>
      </div>
      <div className="space-y-2">
        <p>Try it yourself:</p>
        <div className="w-full max-w-md p-3 border rounded-lg bg-surface-light dark:bg-surface-dark border-gray-200 dark:border-gray-600">
          <form className="space-y-2">
            <AutofillableDemoInput
              label="Autofill via button"
              inputAttributes={{
                id: 'autofill-by-button',
                name: 'email',
                type: 'email',
                placeholder: 'Click (focus) on this field',
              }}
            />
            <AutofillableDemoInput
              label="Autofill via right-click context menu"
              inputAttributes={{
                id: 'autofill-by-right-click',
                type: 'text',
                placeholder:
                  'Right click on this field and select the menu item of the extension',
              }}
            />
          </form>
        </div>
      </div>
      <div>
        If you find the autofill-via-button feature intrusive, you can disable
        it in the <Link href="./options.html">extension Options</Link>.
      </div>
      <div>
        Don&apos;t forget to delete the HideMyEmail addresses you created above
        for the purposes of trying this out:
        <ol className="list-decimal list-inside">
          <li>Open the extension pop-up (🍏 icon)</li>
          <li>Navigate to the &quot;Manage emails&quot; view</li>
          <li>Select, deactivate, and delete the relevant addresses</li>
        </ol>
      </div>
    </div>
  );
};

const TechnicalOverview = () => {
  return (
    <div className="space-y-2">
      <p>
        How does it work? At a high level, the extension interacts with the
        iCloud APIs by simulating the client behavior (i.e. the network
        requests) of the{' '}
        <Link href="https://icloud.com" aria-label="Go to iCloud.com">
          icloud.com
        </Link>{' '}
        web app. For authentication, it relies on the icloud.com cookies that
        have been stored in your browser following the sign-in flow outlined at
        the top of this guide.
      </p>
      <p>
        How does it access the icloud.com cookies? The extension has{' '}
        <Link href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/host_permissions">
          host permissions
        </Link>{' '}
        on several paths of the icloud.com host. When an extension has host
        permissions on a host, all extension ➡️ host-server requests are treated
        as{' '}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy">
          same-origin
        </Link>{' '}
        by the browser. By default, browsers include{' '}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#requests_with_credentials">
          credentials
        </Link>{' '}
        (e.g. cookies) in all same-origin requests.
      </p>
      <p>
        <span className="font-semibold">
          At no point does the extension have access to the Apple ID email and
          password that you feed into the icloud.com sign-in form
        </span>
        . The source of the extension is{' '}
        <Link
          href="https://github.com/dedoussis/icloud-hide-my-email-browser-extension"
          aria-label="source code"
        >
          publicly available in GitHub
        </Link>
        .
      </p>
      <p>
        If you&apos;re skeptical about using this extension, and looking for an
        alternative way of interacting with the HideMyEmail service outside of
        Safari, you can still use icloud.com on any browser. This extension only
        offers a more ergonomic browser experience compared to icloud.com.
      </p>
    </div>
  );
};

const Userguide = () => {
  return (
    <div className="w-9/12 m-auto mt-3 mb-24 text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark">
      <TitledComponent title="Hide My Email" subtitle="Quickstart guide">
        <div>
          <h3 className="font-bold text-lg mb-3">Sign-in to iCloud</h3>
          <SignInInstructions />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">How to use?</h3>
          <UsageInstructions />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Advanced</h3>
          <TechnicalOverview />
        </div>
      </TitledComponent>
    </div>
  );
};

export default Userguide;
