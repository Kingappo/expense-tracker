export const emailTemplates = {
  // Welcome Email Template
  welcome: ({ firstName, surname, email }) => ({
    subject: "🎉Welcome to Tracky!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f7f9fc;">
        <div style="background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Welcome to Tracky</h1>
          <p style="margin: 10px 0 0;">Your journey to better financial management starts here</p>
        </div>
        
        <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <p style="font-size: 18px; color: #2e7d32; margin-bottom: 25px; font-weight: 600;">Hello ${firstName} ${surname},</p>
          
          <p>Thank you for joining Tracky! We're excited to help you take control of your finances and achieve your financial goals.</p>
          
          <div style="background: #f0f9f0; border-left: 4px solid #2e7d32; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0;"><strong>Your account has been successfully created!</strong><br>
            You can now start tracking expenses, setting budgets, and getting smart financial insights.</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <div style="display: flex; margin-bottom: 10px;">
              <span style="font-weight: 600; color: #2e7d32; min-width: 120px;">Name:</span>
              <span>${firstName} ${surname}</span>
            </div>
            <div style="display: flex; margin-bottom: 10px;">
              <span style="font-weight: 600; color: #2e7d32; min-width: 120px;">Email:</span>
              <span>${email}</span>
            </div>
            <div style="display: flex;">
              <span style="font-weight: 600; color: #2e7d32; min-width: 120px;">Status:</span>
              <span style="color: #2e7d32; font-weight: 600;">Active Account</span>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Start Tracking Your Finances</a>
          </div>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <div style="font-size: 20px; font-weight: 700; color: #2e7d32; margin-bottom: 10px;">💰 Tracky</div>
            <p style="margin: 5px 0;">Smart Financial Management Made Easy</p>
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Tracky. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
  }),

  // Budget Alert Template
  budgetAlert: ({
    firstName,
    category,
    month,
    remaining,
    totalSpent,
    budgetAmount,
    type,
  }) => ({
    subject:
      type === "exceeded" ? "⚠️ Budget Exceeded Alert" : "📢 Budget Alert",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f7f9fc;">
        <div style="background: ${
          type === "exceeded"
            ? "linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)"
            : "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)"
        }; color: white; padding: 25px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">${
            type === "exceeded" ? "⚠️ Budget Exceeded!" : "📢 Budget Alert"
          }</h1>
        </div>
        
        <div style="background: white; padding: 35px 25px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <p>Hello ${firstName},</p>
          
          <div style="font-size: 48px; text-align: center; margin: 20px 0;">${
            type === "exceeded" ? "⚠️" : "📢"
          }</div>
          
          <p><strong>${
            type === "exceeded"
              ? "Your expenses have exceeded your budget!"
              : "You're approaching your budget limit!"
          }</strong></p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #eee;">
              <span>Category:</span>
              <strong>${category}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #eee;">
              <span>Month:</span>
              <strong>${month}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #eee;">
              <span>Budget Amount:</span>
              <strong>₦${budgetAmount.toLocaleString()}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #eee;">
              <span>Amount Spent:</span>
              <strong style="color: ${
                type === "exceeded" ? "#d32f2f" : "#ff9800"
              }">₦${totalSpent.toLocaleString()}</strong>
            </div>
            ${
              type === "exceeded"
                ? ""
                : `
            <div style="display: flex; justify-content: space-between;">
              <span>Remaining:</span>
              <strong style="color: #2e7d32;">₦${remaining.toLocaleString()}</strong>
            </div>
            `
            }
          </div>
          
          <div style="height: 10px; background: #e0e0e0; border-radius: 5px; margin: 15px 0; overflow: hidden;">
            <div style="height: 100%; background: ${
              type === "exceeded" ? "#d32f2f" : "#ff9800"
            }; width: ${Math.min(
      (totalSpent / budgetAmount) * 100,
      100
    )}%; border-radius: 5px;"></div>
          </div>
          
          <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 18px; margin: 25px 0; border-radius: 4px;">
            <div style="color: #1976d2; font-weight: 600; margin-bottom: 8px;">💡 Smart Tip:</div>
            <p style="margin: 0;">${
              type === "exceeded"
                ? "Consider reviewing your recent expenses in this category. You might find opportunities to cut back next month."
                : "You have ₦" +
                  remaining.toLocaleString() +
                  " remaining. Try to stay within budget for the rest of the month!"
            }</p>
          </div>
          
          <div style="text-align: center;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0;">Review Your ${category} Expenses</a>
          </div>
          
          <p>Stay on track with your financial goals! 💪</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <div style="font-size: 20px; font-weight: 700; color: #2e7d32; margin-bottom: 10px;">💰 Tracky</div>
            <p style="margin: 5px 0;">Smart alerts to keep your finances in check</p>
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Tracky</p>
          </div>
        </div>
      </div>
    `,
  }),

  // Budget Created/Updated Template
  budgetCreated: ({ firstName, category, month, amount, action }) => ({
    subject: action === "created" ? "New Budget Created" : "Budget Updated",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f7f9fc;">
        <div style="background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%); color: white; padding: 25px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">${
            action === "created"
              ? "Budget Created Successfully!"
              : "Budget Updated!"
          }</h1>
        </div>
        
        <div style="background: white; padding: 35px 25px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <p>Hello ${firstName},</p>
          
          <div style="font-size: 48px; text-align: center; margin: 20px 0; color: #2e7d32;">${
            action === "created" ? "✅" : "📝"
          }</div>
          
          <p>Your budget has been ${
            action === "created" ? "created" : "updated"
          } successfully!</p>
          
          <div style="background: #f0f9f0; border: 2px solid #2e7d32; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
            <span style="display: inline-block; background: #2e7d32; color: white; padding: 8px 20px; border-radius: 20px; font-weight: 600; margin: 10px 0;">${category}</span>
            <h3 style="margin: 15px 0;">${month} Budget</h3>
            <div style="font-size: 42px; font-weight: 700; color: #2e7d32; margin: 15px 0;">₦${amount.toLocaleString()}</div>
            <p>${
              action === "created" ? "New budget set" : "Budget updated"
            } for ${category} in ${month}</p>
          </div>
          
          <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="margin-top: 0;">🎯 Next Steps:</h3>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <div style="background: #2e7d32; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: 600;">1</div>
              <span>Start tracking your ${category} expenses</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <div style="background: #2e7d32; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: 600;">2</div>
              <span>Get alerts when approaching your budget limit</span>
            </div>
            <div style="display: flex; align-items: center;">
              <div style="background: #2e7d32; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: 600;">3</div>
              <span>Review your spending patterns at month-end</span>
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0;">View Your Budget Dashboard</a>
          </div>
          
          <p>Great job taking control of your finances! 💪</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <div style="font-size: 20px; font-weight: 700; color: #2e7d32; margin-bottom: 10px;">💰 Tracky</div>
            <p style="margin: 5px 0;">Your partner in financial success</p>
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Tracky</p>
          </div>
        </div>
      </div>
    `,
  }),

  // Verification OTP Template
  verificationOTP: ({ firstName, OTP }) => ({
    subject: "Verify Your Email - Tracky",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f7f9fc;">
        <div style="background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%); color: white; padding: 25px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Email Verification Required</h1>
        </div>
        
        <div style="background: white; padding: 35px 25px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <p>Hello ${firstName},</p>
          
          <p>Thank you for using BudgetTrack Pro! To complete your account setup and access all features, please verify your email address.</p>
          
          <div style="background: #e3f2fd; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
            <p><strong>Your One-Time Password (OTP):</strong></p>
            <div style="font-size: 42px; font-weight: 700; color: #1976d2; letter-spacing: 10px; margin: 20px 0; padding: 15px; background: white; border-radius: 8px; display: inline-block; border: 2px dashed #2196f3;">${OTP}</div>
            <p style="color: #666; font-size: 14px; margin-top: 15px;">This code will expire in 24 hours</p>
          </div>
          
          <div style="background: #fff8e1; border-left: 4px solid #ffb300; padding: 18px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px;"><strong>Security Tips:</strong></p>
            <p style="margin: 5px 0;">• Never share this OTP with anyone</p>
            <p style="margin: 5px 0;">• Our team will never ask for your OTP</p>
            <p style="margin: 5px 0;">• Delete this email after verification</p>
          </div>
          
          <div style="text-align: center;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0;">Verify Your Email</a>
          </div>
          
          <p>If you didn't request this verification, please ignore this email or contact our support team.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <div style="font-size: 20px; font-weight: 700; color: #2196f3; margin-bottom: 10px;">💰 Tracky</div>
            <p style="margin: 5px 0;">Secure financial management platform</p>
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Tracky</p>
          </div>
        </div>
      </div>
    `,
  }),

  // Password Reset OTP Template
  passwordResetOTP: ({ firstName, OTP }) => ({
    subject: "Password Reset Request - Tracky",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f7f9fc;">
        <div style="background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%); color: white; padding: 25px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Password Reset Request</h1>
        </div>
        
        <div style="background: white; padding: 35px 25px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <p>Hello ${firstName},</p>
          
          <div style="font-size: 48px; text-align: center; margin: 20px 0; color: #d32f2f;">⚠️</div>
          
          <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
          
          <div style="background: #ffebee; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
            <p><strong>Your One-Time Password (OTP):</strong></p>
            <div style="font-size: 42px; font-weight: 700; color: #d32f2f; letter-spacing: 10px; margin: 20px 0; padding: 15px; background: white; border-radius: 8px; display: inline-block; border: 2px dashed #d32f2f;">${OTP}</div>
            <p style="color: #666; font-size: 14px; margin-top: 15px;">This code will expire in 15 minutes</p>
          </div>
          
          <div style="background: #fff3e0; border-left: 4px solid #ff9800; padding: 18px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px;"><strong>⚠️ Important Security Notice:</strong></p>
            <p style="margin: 5px 0;">• This OTP is valid for a single use only</p>
            <p style="margin: 5px 0;">• Never share your OTP with anyone</p>
            <p style="margin: 5px 0;">• Our support team will never ask for your OTP</p>
          </div>
          
          <div style="text-align: center;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0;">Reset Password</a>
          </div>
          
          <p>If you have any concerns about your account security, please contact our support team immediately.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <div style="font-size: 20px; font-weight: 700; color: #d32f2f; margin-bottom: 10px;">💰 Tracky</div>
            <p style="margin: 5px 0;">Keeping your account secure</p>
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Tracky</p>
          </div>
        </div>
      </div>
    `,
  }),

  // Password Changed Template
  passwordChanged: ({ firstName }) => ({
    subject: "Password Changed Successfully - Tracky",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f7f9fc;">
        <div style="background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%); color: white; padding: 25px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Password Updated Successfully</h1>
        </div>
        
        <div style="background: white; padding: 35px 25px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <p>Hello ${firstName},</p>
          
          <div style="font-size: 48px; text-align: center; margin: 20px 0; color: #2e7d32;">🔐</div>
          
          <p><strong>Your password has been changed successfully!</strong></p>
          
          <div style="background: #f0f9f0; border: 2px solid #2e7d32; border-radius: 12px; padding: 25px; margin: 25px 0;">
            <h3 style="margin-top: 0;">🔒 Account Security Confirmed</h3>
            <p>Your Tracky account password was updated on ${new Date().toLocaleString()}.</p>
            <p>If you made this change, no further action is needed.</p>
          </div>
          
          <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="margin-top: 0;">🛡️ Important Security Recommendations:</h3>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <div style="background: #2e7d32; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 18px;">1</div>
              <span>Use a unique password for Tracky Pro</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <div style="background: #2e7d32; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 18px;">2</div>
              <span>Enable two-factor authentication if available</span>
            </div>
            <div style="display: flex; align-items: center;">
              <div style="background: #2e7d32; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 18px;">3</div>
              <span>Regularly review your account activity</span>
            </div>
          </div>
          
          <p><strong>Didn't make this change?</strong></p>
          <div style="text-align: center;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; margin: 10px 5px;">Reset Password Immediately</a>
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; margin: 10px 5px;">Contact Support</a>
          </div>
          
          <p>For your security, this email was sent to you because your password was recently changed.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <div style="font-size: 20px; font-weight: 700; color: #2e7d32; margin-bottom: 10px;">💰 Tracky</div>
            <p style="margin: 5px 0;">Your security is our priority</p>
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Tracky</p>
          </div>
        </div>
      </div>
    `,
  }),

  // Account Deleted Template
  accountDeleted: ({ firstName, email }) => ({
    subject: "Account Deleted - Tracky",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f7f9fc;">
        <div style="background: linear-gradient(135deg, #616161 0%, #424242 100%); color: white; padding: 25px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Account Deletion Confirmed</h1>
        </div>
        
        <div style="background: white; padding: 35px 25px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <p>Hello ${firstName},</p>
          
          <div style="font-size: 48px; text-align: center; margin: 20px 0; color: #616161;">👋</div>
          
          <p><strong>Your BudgetTrack Pro account has been permanently deleted.</strong></p>
          
          <div style="background: #f5f5f5; border-left: 4px solid #616161; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px;"><strong>Account Details:</strong></p>
            <p style="margin: 5px 0;">• Name: ${firstName}</p>
            <p style="margin: 5px 0;">• Email: ${email}</p>
            <p style="margin: 5px 0;">• Deletion Date: ${new Date().toLocaleDateString()}</p>
            <p style="margin: 5px 0;">• Status: Permanently Deleted</p>
          </div>
          
          <p>All your data, including budgets, expenses, and personal information, has been permanently removed from our systems.</p>
          
          <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="margin-top: 0;">What This Means:</h3>
            <p style="margin: 5px 0;">• You can no longer access your account</p>
            <p style="margin: 5px 0;">• All your financial data has been deleted</p>
            <p style="margin: 5px 0;">• This action cannot be undone</p>
            <p style="margin: 5px 0;">• You're welcome to create a new account anytime</p>
          </div>
          
          <p><strong>Was this a mistake or do you have feedback?</strong></p>
          <div style="text-align: center;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; margin: 10px 5px;">Share Your Feedback</a>
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; margin: 10px 5px;">Contact Support</a>
          </div>
          
          <p>Thank you for being part of Tracky. We're sorry to see you go and hope to serve you again in the future.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <div style="font-size: 20px; font-weight: 700; color: #616161; margin-bottom: 10px;">💰 Tracky</div>
            <p style="margin: 5px 0;">Wishing you financial success ahead</p>
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Tracky</p>
          </div>
        </div>
      </div>
    `,
  }),
};
