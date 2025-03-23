"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[474],{53474:(t,e,n)=>{n.d(e,{SIWEController:()=>o,getDidAddress:()=>s.q_h,getDidChainId:()=>s.aG$});var i=n(80666);n(72538);var s=n(31650),a=n(55476),r=n(98520);const c=(0,r.BX)({status:"uninitialized"}),o={state:c,subscribeKey:(t,e)=>(0,a.u$)(c,t,e),subscribe:t=>(0,r.B1)(c,(()=>t(c))),_getClient(){if(!c._client)throw new Error("SIWEController client not set");return c._client},async getNonce(t){const e=this._getClient(),n=await e.getNonce(t);return this.setNonce(n),n},async getSession(){try{const t=this._getClient(),e=await t.getSession();return e&&(this.setSession(e),this.setStatus("success")),e}catch{return}},createMessage(t){const e=this._getClient().createMessage(t);return this.setMessage(e),e},async verifyMessage(t){const e=this._getClient();return await e.verifyMessage(t)},async signIn(){const t=this._getClient();return await t.signIn()},async signOut(){const t=this._getClient();await t.signOut(),this.setStatus("ready"),this.setSession(void 0),t.onSignOut?.()},onSignIn(t){const e=this._getClient();e.onSignIn?.(t)},onSignOut(){const t=this._getClient();t.onSignOut?.()},setSIWEClient(t){c._client=(0,r.KR)(t),c.status="ready",i.Hd.setIsSiweEnabled(t.options.enabled)},setNonce(t){c.nonce=t},setStatus(t){c.status=t},setMessage(t){c.message=t},setSession(t){c.session=t,c.status=t?"success":"ready"}};var l=n(28377),u=n(60178);const g=u.AH`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;var d=function(t,e,n,i){var s,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(r=(a<3?s(r):a>3?s(e,n,r):s(e,n))||r);return a>3&&r&&Object.defineProperty(e,n,r),r};let p=class extends u.WF{constructor(){super(...arguments),this.dappImageUrl=i.Hd.state.metadata?.icons,this.walletImageUrl=i.iT.getConnectedWalletImageUrl()}firstUpdated(){const t=this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");t?.[0]&&this.createAnimation(t[0],"translate(18px)"),t?.[1]&&this.createAnimation(t[1],"translate(-18px)")}render(){return u.qy`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(t,e){t.animate([{transform:"translateX(0px)"},{transform:e}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};p.styles=g,p=d([(0,l.customElement)("w3m-connecting-siwe")],p);var w=n(15322),h=n(47537),S=function(t,e,n,i){var s,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(r=(a<3?s(r):a>3?s(e,n,r):s(e,n))||r);return a>3&&r&&Object.defineProperty(e,n,r),r};let C=class extends u.WF{constructor(){super(...arguments),this.dappName=i.Hd.state.metadata?.name,this.isSigning=!1,this.isCancelling=!1}render(){return this.onRender(),u.qy`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-connecting-siwe></w3m-connecting-siwe>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          Cancel
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}onRender(){o.state.session&&i.W3.close()}async onSign(){this.isSigning=!0,i.En.sendEvent({event:"CLICK_SIGN_SIWE_MESSAGE",type:"track",properties:{network:i.p_.state.caipNetwork?.id||"",isSmartAccount:i.Uj.state.preferredAccountType===h.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}});try{o.setStatus("loading");const t=await o.signIn();return o.setStatus("success"),i.En.sendEvent({event:"SIWE_AUTH_SUCCESS",type:"track",properties:{network:i.p_.state.caipNetwork?.id||"",isSmartAccount:i.Uj.state.preferredAccountType===h.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}}),t}catch(t){const e=i.Uj.state.preferredAccountType===h.Vl.ACCOUNT_TYPES.SMART_ACCOUNT;return e?i.Pt.showError("This application might not support Smart Accounts"):i.Pt.showError("Signature declined"),o.setStatus("error"),i.En.sendEvent({event:"SIWE_AUTH_ERROR",type:"track",properties:{network:i.p_.state.caipNetwork?.id||"",isSmartAccount:e}})}finally{this.isSigning=!1}}async onCancel(){this.isCancelling=!0;i.Uj.state.isConnected?(await i.x4.disconnect(),i.W3.close()):i.IN.push("Connect"),this.isCancelling=!1,i.En.sendEvent({event:"CLICK_CANCEL_SIWE",type:"track",properties:{network:i.p_.state.caipNetwork?.id||"",isSmartAccount:i.Uj.state.preferredAccountType===h.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}})}};S([(0,w.wk)()],C.prototype,"isSigning",void 0),S([(0,w.wk)()],C.prototype,"isCancelling",void 0),C=S([(0,l.customElement)("w3m-connecting-siwe-view")],C)}}]);